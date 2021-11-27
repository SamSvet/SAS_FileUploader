import React, {useContext, useEffect, useMemo, useState} from "react"
import {CardContainer} from "../../containers/CardContainer"
import {CardBodyContainer} from "../../containers/CardBodyContainer"
import {LoadingButton} from "../../LoadingButton"
import {sasContext} from "../../../context/adapterSAS/sasContext"
import {useData} from "../../../context/DataContext"
import validateInfo from "./validateInfo"
import {IntermediateResult} from "./IntermediateResult"
import {FinalResult} from "./FinalResult"
import H54s from "h54s"
import {Ripple} from "../../containers/Ripple"


export const SummarySASCard = () => {
    const finalDataInitial = useMemo(() => {}, [])
    const {data, errors, setErrorValues, setSasValues} = useData()
    const {fileInput} = data
    const {loading,  callSAS} = useContext(sasContext)
    const [disabled, setDisabled] = useState(false)
    const [sasIntermediate, setSasIntermediate] = useState(finalDataInitial)
    const [sasFinalData, setSasFinalData] = useState(finalDataInitial)

    useEffect(() => {
        callSAS('/Apps/SASUploader/startupService')
            .then(result => { setSasValues(result) })
            .catch(err => { console.log(err) })
    }, [])

    const groupByKey = (arr, key) => {
        return arr.reduce(function(acc, cur){
            if (cur[key] in acc){
                return {...acc, [cur[key]]:[...acc[cur[key]], cur]}
            }
            return {...acc, [cur[key]]:[cur]}
        }, {})
    }

    const loadingClick2 = () => {
        const sasTable = new H54s.SasData(data.selectChecks && data.selectChecks.length ? data.selectChecks : [{VALUE:'', LABEL:''}], 'selectChecks')
        if (fileInput) {
            sasTable.addFile(fileInput.myfile, 'myFile')
            sasTable.addTable(fileInput.sheet.map(el => ({
                fields:el.meta.fields.join(' '),
                delimiter: el.meta.delimiter ? JSON.stringify(fileInput.sheet[0].meta.delimiter) : '',
                linebreak: el.meta.linebreak ? JSON.stringify(fileInput.sheet[0].meta.linebreak) : '',
                sheetName: el.meta.sheetName ? el.meta.sheetName : ''
            })),'meta')
            sasTable.addTable([{process_cd: data.fileParamsType[0].VALUE}], 'process')
        }
        callSAS(`${data.fileParamsType[0].CHECK_STP}`, sasTable)
            .then(sasResponse => { setSasIntermediate({...sasResponse, data:groupByKey(sasResponse.data, 'SUBGROUP')}) })
            .catch(err => { console.log(err) })
    }

    useEffect(() => {
        if (disabled && errors && Object.keys(errors).length===0 && errors.constructor === Object ){
            loadingClick2()
        }
        setDisabled(false)
    }, [errors, disabled])

    useEffect(() => {
        setSasIntermediate((prev) => finalDataInitial)
        setSasFinalData((prev) => finalDataInitial)
    }, [data, finalDataInitial])

    const intermediateCallBack = (finalRes, intermediateRes=null) => {
        if (intermediateRes) setSasIntermediate(intermediateRes)
        setSasFinalData(finalRes)
    }

    const loadingClick3 = (event) => {
        setSasIntermediate((prev) => finalDataInitial)
        setSasFinalData((prev) => finalDataInitial)
        setErrorValues(validateInfo)
        setDisabled((prevState) => true)
    }

    return (
        <CardContainer isDragZone={false} className='border-0 py-5'>
            <div className={"g-3 p-3"} >
                <CardBodyContainer className={"row"}>
                    <div className='col-md-3'>
                        <LoadingButton
                            style={{width: "300px", position: "relative", overflow: "hidden"}}
                            disabled={disabled}
                            loading={loading}
                            onClick={loadingClick3}
                        >
                            Call SAS to check
                            <Ripple duration={2000} backgroundColor={"#212529"} />
                        </LoadingButton>
                    </div>
                    <IntermediateResult className='col-md-2' sasData={sasIntermediate} onCall={intermediateCallBack}/>
                    <div className={"col-md-2"}/>
                    <FinalResult className='col-md' sasData={sasFinalData} />
                </CardBodyContainer>
            </div>
        </CardContainer>
    )
}