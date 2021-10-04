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

export const SelectFileCard = () => {
    const {errors} = useData()
    const textInput = useRef(null)
    const contentRef = useRef(null)
    const [active, setActive] = useState(false)
    const [highlighted, setHighlighted] = useState(false)
    const {localData, handleChangeSelect} = useForm()
    const defaultParse = {data:[], meta:{fields:[]}, size:0, name:""}

    useEffect(() => {
        contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px` : '0px'
    }, [active])

    const processFiles = (files, name) => {
        Array.from(files)
            .forEach(async (file) => {
                switch (file.type){
                    case "application/vnd.ms-excel":
                    case "text/csv":
                    case "text/plain":
                        const text = await file.text()
                        const csvResult = parse(text, {preview : 10, header: true})
                        handleChangeSelect({ ...csvResult, myfile:file}, name)
                        break
                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        const xlsResult = await parseXlsx(file)
                        handleChangeSelect({ ...xlsResult, myfile:file}, name)
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
                               onChange={inputHandler}
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
                <DataGridPreview fileData={localData.fileInput || defaultParse} />
            </CardBodyContainer>
        </CardContainer>
    )
}