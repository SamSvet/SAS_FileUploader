import React, {useEffect} from 'react'
import Select from "react-select"
import {customStyles} from "../../DarkSelectStyle"
import {TransitionGroup, CSSTransition} from "react-transition-group"
import "./checkList.css"
import useForm from "../../../hooks/useForm"
import {useData} from "../../../context/DataContext"

export const CheckListBase = ({type, callBackOnChange}) => {

    const {sasData} = useData()
    const {localData, handleChangeSelect} = useForm()


    const options = sasData.selectChecks ? sasData.selectChecks : [
        { LABEL: 'check#1', VALUE: 'check#1 : Here goes description' },
        { LABEL: 'check#2', VALUE: 'check#2 : Here goes description', ISFIXED:1},
        { LABEL: 'check#3', VALUE: 'check#3 : Here goes description', ISFIXED:0 },
        { LABEL: 'check#4', VALUE: 'check#4 : Here goes description', ISFIXED:0 },
    ]

    useEffect(() => {
        if (Object(type).VALUE === 'import_ext_lists') {
            if (localData.selectChecks) handleChangeSelect(localData.selectChecks, "selectChecks")
            else  handleChangeSelect(options.filter(elem => elem.ISFIXED), "selectChecks")
        }
    }, [type])


    const onChange = (e, option) => {
        if (option.removedValue && option.removedValue.ISFIXED) return;
        handleChangeSelect(e, "selectChecks")
        callBackOnChange()
    }

    return (
        <div className="row" >
            <div className="col-md-auto">
                <Select
                    defaultValue={localData.selectChecks}
                    value={localData.selectChecks}
                    onChange={onChange}
                    inputId="selectCheckBase1"
                    menuPortalTarget={document.querySelector("body")}
                    isMulti
                    options={options}
                    getOptionLabel = {(option) => option.LABEL}
                    getOptionValue = {(option) => option.VALUE}
                    styles={customStyles}
                    isClearable={false}
                    isSearchable={false}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null, CrossIcon:() => null, Placeholder:() => 'Checks' }}
                />
            </div>
            <div className="col">
                {Object.keys(localData).length>0 &&
                <TransitionGroup component="ul" className="list-group">
                    {localData.selectChecks.map((check, idx) =>
                        <CSSTransition timeout={{enter:700, exit: 700}} key={idx} classNames={"check"}>
                            <div >
                                <li className="list-group-item-borderless d-flex justify-content-between align-items-center" >
                                    {check.VALUE}
                                </li>
                            </div>
                        </CSSTransition>
                    )}
                </TransitionGroup>
                }
            </div>
        </div>
    )
}