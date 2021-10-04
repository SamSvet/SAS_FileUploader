import React, {useContext} from 'react'
import {CardContainer} from "../../containers/CardContainer"
import {CardBodyContainer} from "../../containers/CardBodyContainer"
import Chevron from "../../Chevron"
import {useData} from "../../../context/DataContext"
import {sasContext} from '../../../context/adapterSAS/sasContext'
import H54s from 'h54s'


export const SummaryCard = () => {
    const {data} = useData()
    const entries  = Object.entries(data).filter((entry) => entry[0] !== "fileInput")
    const {fileInput} = data
    const {state, callSAS} = useContext(sasContext)

    const handleClickGet = (e) => {
        const sasResponse = callSAS('/Apps/SASUploader/startupService', null)
        console.log(sasResponse)
    }
    const handleClickSend = (e) => {
        var specs = {
            someNumber: {colType: 'num', colLength: 8},
            someString: {colType: 'string', colLength: 5},
            someDate: {colType: 'date', colLength: 8}
        }
        var sendData = new H54s.SasData([
            {
                someNumber: 42.0,
                someString: 'Stuff',
                someDate: new Date()
            }
        ], 'data', specs)
        if (data.selectChecks) {sendData.addTable(data.selectChecks, 'selectChecks')}
        if (fileInput) {sendData.addFile(fileInput.file, 'inputFile')}
        const sasResponse = callSAS('/Apps/SASUploader/sendData', sendData)
        console.log(sasResponse)
    }
    return (
        <CardContainer isDragZone={false} className={"border-light"}>
            <div className={"row"}>

                <CardBodyContainer style={{backgroundColor: "#cfe2ff"}}>
                    <div className={"row"}>
                        <div className={"float-end"}>
                            <button
                                className={`float-right btn btn-sm btn-outline-primary border-0`}
                                onClick={handleClickGet}
                            >StartupService
                                <Chevron
                                    className={'card__icon'}
                                    width={24} height={24} fill={"currentColor"}/>
                            </button>
                            <button
                                className={`float-right btn btn-sm btn-outline-primary border-0`}
                                onClick={handleClickSend}
                            >Send File
                                <Chevron
                                    className={'card__icon'}
                                    width={24} height={24} fill={"currentColor"}/>
                            </button>
                        </div>
                    </div>
                    <table className="table table-sm ">
                        <thead>
                        <tr>
                            <th>Field</th><th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            entries.map((entry) =>
                                <tr key={entry[0]}>
                                    <td>{entry[0]}</td>
                                    <td>{JSON.stringify(entry[1])}</td>
                                </tr>
                            )
                        }
                        {
                            fileInput &&
                            <tr>
                                <td>File</td>
                                <td><small>{fileInput.myfile.name} - </small><small>{fileInput.myfile.size}</small></td>
                            </tr>
                        }

                        </tbody>
                    </table>
                </CardBodyContainer>

            </div>
        </CardContainer>
    )

    // function mapDispatchToProps(dispatch) {
    //     return {
    //         call: async (program) => {
    //             let callData = await adapterService.call(dispatch, program, null)
    //             if (typeof callData === "string"){
    //                 callData = JSON.parse(callData)
    //             }
    //             return callData
    //         }
    //     }
    // }
}