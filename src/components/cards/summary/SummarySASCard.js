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
    const finalDataInitial = useMemo(() => {
        return {data:[], result:[]}
        }, [])

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

    const loadingClick2 = () => {
        const sasTable = new H54s.SasData(data.selectChecks && data.selectChecks.length ? data.selectChecks : [{VALUE:'', LABEL:''}], 'selectChecks')
        if (fileInput) {
            sasTable.addFile(fileInput.myfile, 'myFile')
            if (fileInput.data.length){
                sasTable.addTable([{
                    delimiter: fileInput.meta.delimiter ? JSON.stringify(fileInput.meta.delimiter) : '',
                    linebreak: fileInput.meta.linebreak ? JSON.stringify(fileInput.meta.linebreak) : '',
                    targetTable: data.fileParamsType[0].TARGET_TABLE,
                    fields: fileInput.meta.fields.join(' ')
                }], 'meta')
            }
        }
        callSAS('/Apps/SASUploader/checkData', sasTable)
            .then(result => { setSasIntermediate(result) })
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

    // const loadingClick = (event) => {
    //     setDisabled((prevState) => true)
    //     callSAS('/Apps/SASUploader/sendData', [])
    //         .then((result) => {
    //             console.log(result)
    //         })
    //         .catch((reason) => {
    //             toastr.error('Unable to request /Apps/SASUploader/sendData')
    //         })
    //     setTimeout(() => {setDisabled((prevState) => false)}, 3000)
    // }

    const intermediateCallBack = (finalRes, intermediateRes=null) => {
        if (intermediateRes) setSasIntermediate(intermediateRes)
        setSasFinalData(finalRes)
    }

    const loadingClick3 = (event) => {
        setSasIntermediate((prev) => finalDataInitial)
        setSasFinalData((prev) => finalDataInitial)
        setErrorValues(validateInfo)
        setDisabled((prevState) => true)
        /*setTimeout(() => setSasIntermediate({data:[{RC: 0, DESC: "Success", CNT: 123}, {RC:1, DESC: 'Error', CNT: 456}, {RC:-1, DESC: "Warning", CNT: 678}], result:[{}]}), 3000)*/
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
                            Check this file
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