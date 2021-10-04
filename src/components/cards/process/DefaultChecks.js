import React, {useEffect} from 'react'
import useForm from "../../../hooks/useForm"
import Select from "react-select"
import {customStyles, groupStyles, groupBadgeStyles} from "../../DarkSelectStyle"
import {CSSTransition, TransitionGroup} from "react-transition-group"
import "./checkList.css"

export const DefaultChecks = ({isActive, isLocal, callBackOnChange, options}) => {
   const {localData, handleChangeSelect} = useForm()

    useEffect(() => {
        if (isActive && !isLocal) {
            if (localData.selectChecks) handleChangeSelect(localData.selectChecks, "selectChecks")
            else handleChangeSelect(options.flatMap(el => el.options).filter(el => el.ISFIXED), "selectChecks")
        }
    }, [isActive, isLocal])

    const onChange = (e, option) => {
        if (option.removedValue && option.removedValue.ISFIXED) return;
        handleChangeSelect(e, "selectChecks")
        callBackOnChange()
    }

    const formatGroupLabel = data => (
        <div style={groupStyles}>
            <span>{data.LABEL}</span>
            <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
    )

    return (
        <div className="row">
            <div className="col-md-auto">
                <Select
                    defaultValue={localData.selectChecks}
                    value={localData.selectChecks}
                    onChange={onChange}
                    menuPortalTarget={document.querySelector("body")}
                    isMulti
                    options={options}
                    formatGroupLabel={formatGroupLabel}
                    getOptionLabel = {(option) => option.LABEL}
                    getOptionValue = {(option) => option.VALUE}
                    styles={customStyles}
                    isClearable={false}
                    isSearchable={false}
                    components={{DropdownIndicator:() => null, IndicatorSeparator:() => null, CrossIcon:() => null, Placeholder:() => 'Checks'}}
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