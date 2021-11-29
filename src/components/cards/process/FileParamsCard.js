import React, {useContext, useEffect, useRef, useState} from "react"
import Select from 'react-select'
import {CardContainer} from "../../containers/CardContainer"
import {customStyles, errorStyles} from "../../DarkSelectStyle"
import {CardHeaderContainer} from "../../containers/CardHeaderContainer"
import Chevron from "../../Chevron"
import {CardBodyContainer} from "../../containers/CardBodyContainer"
import "../../styles/chevron.css"
import {useData} from "../../../context/DataContext"
import useForm from "../../../hooks/useForm"
import "../../styles/tooltip.css"
import {sasContext} from "../../../context/adapterSAS/sasContext"
import {DefaultProcess} from "./DefaultProcess"
import {localShoesOptions} from "./shoes/localOptions"
import {localClassOptions} from "./class/localOptions"

export const FileParamsCard = () => {
    const {handleChangeSelect} = useForm()
    const {errors, sasData, setErrorValues} = useData()
    const contentRef = useRef(null)
    const [channel, setChannel] = useState({VALUE:null, LABEL: ''})
    const [active, setActive] = useState(false)
    const {loading} = useContext(sasContext)
    const scrollHeight = contentRef.current ? contentRef.current.scrollHeight : 0

    useEffect(() => {
        contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px` : '0px'
    }, [scrollHeight, active])

    const options = sasData.fileParamsType ? sasData.fileParamsType : [
        { VALUE: 'sashelp_shoes', LABEL: 'shoes list', TARGET_TABLE: 'sashelp.shoes', COLUMNS: "Region,Product,Subsidiary,Stores,Sales,Inventory,Returns"},
        { VALUE: 'sashelp_class', LABEL: 'class list', TARGET_TABLE: 'sashelp.class', COLUMNS: "Age,Height,Name,Sex,Weight" }
    ]

    const selectChange = (e) => {
        setActive((prev) => true)
        setChannel(e)
        handleChangeSelect([e], "fileParamsType")
        setErrorValues(() => {})
    }

    return (
        <CardContainer isDragZone={false} className={"border-light"}>
            <small style={{fontSize: "0.7rem", color: "#dc3545"}}>{errors.fileParamsType && errors.fileParamsType.errDesc}&nbsp;</small>
            <CardHeaderContainer style={{overflow: 'visible'}} >
                <div className={'row'}>
                    <div className={'col-5'}>
                        <Select
                        menuPortalTarget={document.querySelector("body")}
                        value={"Process"}
                        placeholder={"Process"}
                        onChange={selectChange}
                        className={'float-start'}
                        options={options}
                        getOptionLabel = {(option) => option.LABEL}
                        getOptionValue = {(option) => option.VALUE}
                        styles={{...customStyles, ...(errors.fileParamsType && errorStyles)}}
                        isDisabled={loading}
                        components={{
                            DropdownIndicator:() => null,
                            IndicatorSeparator:() => null,
                            Placeholder:() => loading ? <>Process...<span className={"spinner-border spinner-border-sm"} role={'status'} aria-hidden={'true'}/></> : 'Process'}}/>
                    </div>
                    <div className={'col-6'}><span >{channel.LABEL}</span></div>
                    <div className={'col-1'}>
                        <button
                            className="float-end btn btn-sm btn-outline-light"
                            onClick={() => {setActive((prev) => !prev)}}
                        >
                        <Chevron
                            className={active ? 'card__icon rotate': 'card__icon'}
                            width={10} fill={"#343a30"}/>
                        </button>
                    </div>
                </div>

            </CardHeaderContainer>
            <CardBodyContainer ref={contentRef} >
                <DefaultProcess
                    userProcess={channel}
                    currentProcess='sashelp_shoes'
                    combineFunction={(res) => [{LABEL:'Base checks', options:res.selectCheckList}, {LABEL:'Customm checks', options:res.selectStpList}]}
                    defaultOptions={localShoesOptions}
                />
                <DefaultProcess
                    userProcess={channel}
                    currentProcess='sashelp_class'
                    combineFunction={(res) => [{LABEL:'Base checks', options:res.selectCheckList}, {LABEL:'Customm checks', options:res.selectStpList}]}
                    defaultOptions={localClassOptions}
                />
            </CardBodyContainer>
        </CardContainer>
    )
}