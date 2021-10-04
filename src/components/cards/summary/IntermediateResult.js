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
            const sasTable = new H54s.SasData([{interCheckboxWrn: warningCheck ? 1 : 0}], 'IntermediateResult')
            if (sasData.outputdata && sasData.outputdata.length > 0){
                sasTable.addTable([{
                    tableName: sasData.outputdata[0].TABLENAME,
                    tableSchema: sasData.outputdata[0].TABLESCHEMA,
                    userFileName: data.fileInput.myfile.name,
                    userProcessName: data.fileParamsType[0].LABEL,
                    processName: data.fileParamsType[0].VALUE,
                    targetTable: data.fileParamsType[0].TARGET_TABLE,
                    interCheckboxWrn: warningCheck ? 1 : 0,
                    errCnt: sasData.data.filter(el => el.RC===1).flatMap(el => el.CNT)[0] || 0,
                    sucCnt: sasData.data.filter(el => el.RC===0).flatMap(el => el.CNT)[0] || 0,
                    wrnCnt: sasData.data.filter(el => el.RC===-1).flatMap(el => el.CNT)[0] || 0
                }], 'inputdata')
            }
            const result = await callSAS(`${data.fileParamsType[0].LOAD_STP}`, sasTable)
            onCall(result, {data:[], result:[]} )
            // toastr.success(result.usermessage)
        }
        catch (e) {
            // toastr.error(`Unable to request ${data.fileParamsType[0].LOAD_STP}`)
            console.log(e)
        }
        /*finally {
            setTimeout(() => {
                onCall({data:[{KEY:"LOAD_ID",VALUE:"1"}, {KEY:"USER",VALUE:"Светличный Семен Викторович"}, {KEY:"Количество",VALUE:"123"}], result: [{RC:0, RS:""}]})
            }, 3000)
        }*/
    }

    return (
        <div style={props.style}
             className={props.className}
        >
            {sasData.result && sasData.data && sasData.result.length>0 && sasData.data.length>0 &&
            <TransitionGroup component="ul" className="list-group" >
                {sasData.data.map((sasrow, idx) =>
                    <CSSTransition in classNames={"intermediate_result"} timeout={{enter:1000, exit:1000}} key={idx}>
                        <li style={{height:"48px"}} className="list-group-item-borderless d-flex justify-content-between align-items-center">
                            <div style={{width: "300px"}}>
                                <label>
                                    {sasrow.RC === 0 && <input type="checkbox" id="interCheckboxSuc" name={"interCheckboxSuc"} disabled checked/>}
                                    {sasrow.RC === 1 && <input type="checkbox" id="interCheckboxErr" name={"interCheckboxErr"} disabled />}
                                    {sasrow.RC === -1 && <input type="checkbox" id="interCheckboxWrn" name={"interCheckboxWrn"} onChange={handleWarningCheck}/>}
                                    {sasrow.DESC}
                                </label>
                                {/*{sasrow.RC === 0 && <CheckBox title={sasrow.DESC} disabled checked/> }*/}
                                {/*{sasrow.RC === 1 && <CheckBox title={sasrow.DESC} disabled/> }*/}
                                {/*{sasrow.RC === -1 && <CheckBox title={sasrow.DESC} onChange={handleWarningCheck}/> }*/}
                                {/*<button className={`btn badge rounded-pill float-end ${renderBadge(sasrow.RC)}` } disabled>{sasrow.CNT}</button>*/}
                                {/*<span className={`btn badge rounded-pill float-end ${renderBadge(sasrow.RC)}` } >{sasrow.CNT}</span>*/}
                                <a
                                    className={`btn badge rounded-pill float-end ${renderBadge(sasrow.RC)}` }
                                    role={"button"}
                                    href={`/SASStoredProcess/do?_program=/Apps/SASUploader/downloadService&TABLE=${sasData.outputdata[0].TABLENAME}&TYPE=${sasrow.RC}`}
                                >{sasrow.CNT}</a>
                            </div>
                        </li>
                    </CSSTransition>
                )}
                <LoadingButton className={"text-center mt-2"}
                               style={{position: "relative", overflow: "hidden"}}
                               onClick={handleLoadBtn}
                               disabled={disabled}
                               loading={loading}
                >
                    Load to SAS
                    <Ripple duration={2000} backgroundColor={"#212529"} />
                </LoadingButton>
            </TransitionGroup>
            }
        </div>
    )
}