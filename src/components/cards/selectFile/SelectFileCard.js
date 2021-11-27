import React, {useEffect, useRef, useState} from "react"
import {CardContainer} from "../../containers/CardContainer"
import {CardHeaderContainer} from "../../containers/CardHeaderContainer"
import Chevron from "../../Chevron"
import {parse} from "papaparse"
import {CardBodyContainer} from "../../containers/CardBodyContainer"
import useForm from "../../../hooks/useForm"
import "./selectFile.css"
import {useData} from "../../../context/DataContext"
import {parseXlsx} from "./parseXlsx"
import {DataGridPreview} from "./DataGridPreview"
import {Carousel} from "../../containers/Carousel"

export const SelectFileCard = () => {
    const {errors, setErrorValues} = useData()
    const textInput = useRef(null)
    const contentRef = useRef(null)
    const carouselRef = useRef(null)
    const [active, setActive] = useState(false)
    const [highlighted, setHighlighted] = useState(false)
    const {localData, handleChangeSelect} = useForm()
    const defaultSheetData = {data:[], meta:{fields:[]}}
    const defaultFileData = {size:0, name:""}

    useEffect(() => {
        contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px` : '0px'
    }, [active])

    const processFiles = (files, name) => {
        setErrorValues(() => {})
        Array.from(files)
            .forEach(async (file) => {
                switch (file.type){
                    case "application/vnd.ms-excel":
                    case "text/csv":
                    case "text/plain":
                        const text = await file.text()
                        const csvResult = parse(text, {preview : 10, header: true})
                        handleChangeSelect({ sheet:[{...csvResult, index: 0}], myfile:file}, name)
                        break
                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        const xlsResult = await parseXlsx(file)
                        handleChangeSelect({ sheet:xlsResult, myfile:file}, name)
                        break
                    default:
                }
                setActive(true)
            })
        setTimeout(() => { contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`}, 100)
    }

    const dropFunction = (e) => {
        e.preventDefault()
        setHighlighted(false)
        processFiles(e.dataTransfer.files, textInput.current.name)
    }

    const inputHandler = (e) => {
        processFiles(e.target.files, e.target.name)
    }

    return (
        <CardContainer
            className={`${highlighted ? 'border-dark' : 'border-light'}`}
            isDragZone={true}
            dragOverCallBack={(event) => {event.stopPropagation(); event.preventDefault()}}
            dropCallBack={(event) => dropFunction(event)}
            dragEnterCallBack={() => setHighlighted(true)}
            dragLeaveCallBack={() => setHighlighted(false)}
        >
            <small style={{fontSize: "0.7rem", color: "#dc3545"}}>{errors.fileInput && errors.fileInput.errDesc}&nbsp;</small>
            <CardHeaderContainer>
                <div className={'row'}>
                    <div className={'col-5'}>
                        <button type="button"
                                style={{width:"300px", height: '38px'}}
                                className={`btn btn-outline-dark text-start ${errors.fileInput ? 'border-danger' : 'border-0'} `}
                                onClick={() => {textInput.current.click()}}
                        >File
                        </button>
                        <input name={"fileInput"} type="file" className="inputfile inputfile-5" ref={textInput}
                               accept=".csv, .txt, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                               onChange={inputHandler} onClick={e => e.target.value=""}
                        />
                    </div>
                    <div className={'col-6'}><span >{`${Object.keys(localData).length ? localData.fileInput.myfile.name : ""}`}</span></div>
                    <div className={'col'}>
                        <button
                            className={`float-end btn btn-sm btn-outline-light `}
                            onClick={() => {setActive(!active)}}
                        >
                            <Chevron
                                className={active ? 'card__icon rotate': 'card__icon'}
                                width={10} fill={"#343a30"}
                            />
                        </button>
                    </div>
                </div>
            </CardHeaderContainer>
            <CardBodyContainer ref={contentRef}>
                {
                    localData.fileInput && localData.fileInput.sheet && localData.fileInput.myfile && localData.fileInput.sheet.length>1
                        ?
                        <Carousel maxHeight={500} ref={carouselRef} fluid={true}>
                            {localData.fileInput.sheet.map( sheet => <DataGridPreview key={sheet.meta.sheetName} sheetData={sheet} fileData={localData.fileInput.myfile}/>)}
                        </Carousel>
                        : <DataGridPreview sheetData={localData.fileInput ? localData.fileInput.sheet[0] : defaultSheetData} fileData={localData.fileInput ? localData.fileInput.myfile : defaultFileData}/>
                }
            </CardBodyContainer>
        </CardContainer>
    )
}