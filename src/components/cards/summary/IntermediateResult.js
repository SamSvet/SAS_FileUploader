import React, {useContext, useState} from 'react'
import {CSSTransition, TransitionGroup} from "react-transition-group"
import "./intermediateResult.css"
import {LoadingButton} from "../../LoadingButton"
import {sasContext} from "../../../context/adapterSAS/sasContext"
import H54s from 'h54s'
import {Ripple} from "../../containers/Ripple"
import {useData} from "../../../context/DataContext"


export const IntermediateResult = ({sasData, onCall, ...props}) => {
    const [warningCheck, setWarningCheck] = useState(false)
    const {loading,  callSAS} = useContext(sasContext)
    const {data} = useData()
    const [disabled] = useState(false)

    const renderBadge = (errorCode) => {
        switch (errorCode) {
            case 0:
                return 'bg-success ';
            case 1:
                return 'bg-danger ';
            case -1:
                return 'bg-warning ';
            default:
                return 'bg-secondary ';
        }
    }

    const handleWarningCheck = (e) => {
        setWarningCheck((prev) => !prev)
    }
    const handleLoadBtn = async (e) => {
        onCall({data:[], result:[]})
        try {
            const checkResult = new H54s.SasData(Object.keys(sasData.data).flatMap(k => sasData.data[k]), 'checkResult')
            checkResult.addTable([{
                interCheckboxWrn: warningCheck ? 1 : 0,
                process_cd: data.fileParamsType[0].VALUE,
                userFileName: data.fileInput.myfile.name
            }], 'inputData')
            const result = await callSAS(`${data.fileParamsType[0].LOAD_STP}`, checkResult)
            onCall(result, {} )
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={props.style}
             className={props.className}
        >
            {sasData && sasData.data &&
            <>
                <TransitionGroup component="ul" className="list-group" >
                    {Object.keys(sasData.data).map(group => (
                        <>
                        {group !== 'undefined' && <small>{group}</small>}
                        {sasData.data[group].map((sasrow, idx) =>
                            <CSSTransition classNames={"intermediate_result"} timeout={{enter:1000, exit:1000}} key={`${group}_${idx}`}>
                                <li style={{height:"48px"}} className="list-group-item-borderless d-flex justify-content-between align-items-center">
                                    <div style={{width: "300px"}}>
                                        <label>
                                            {sasrow.RC === 0 && <input type="checkbox" id="interCheckboxSuc" name={"interCheckboxSuc"} disabled checked/>}
                                            {sasrow.RC === 1 && <input type="checkbox" id="interCheckboxErr" name={"interCheckboxErr"} disabled />}
                                            {sasrow.RC === -1 && <input type="checkbox" id="interCheckboxWrn" name={"interCheckboxWrn"} onChange={handleWarningCheck}/>}
                                            {sasrow.DESC}
                                        </label>
                                        <a className={`btn badge rounded-pill float-end ${renderBadge(sasrow.RC)} ${sasrow.CNT <= 0 && 'disabled'}` }
                                           role={"button"}
                                           href={`/SASStoredProcess/do?_program=/Apps/SASUploader/downloadService&TABLE=${sasrow.TABLENAME}&TYPE=${sasrow.RC}`}

                                        >{sasrow.CNT}</a>
                                    </div>
                                </li>
                            </CSSTransition>
                        )}
                        </>
                    ))}
                </TransitionGroup>
                <LoadingButton className={"text-center mt-2"}
                style={{position: "relative", overflow: "hidden"}}
                onClick={handleLoadBtn}
                disabled={disabled}
                loading={loading}
                >
                Upload to SAS
                <Ripple duration={2000} backgroundColor={"#212529"} />
                </LoadingButton>
            </>
            }
        </div>
    )
}