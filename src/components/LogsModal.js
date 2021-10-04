import React, {useContext} from "react"
import {Button, Modal, Tab, Tabs} from "react-bootstrap"
import "./styles/logsModal.css"
import {sasContext} from "../context/adapterSAS/sasContext"
import * as adapterLogs from 'h54s/src/logs'
import {LogHeader} from "./LogHeader"
import "./styles/bocollapsible.css"
import {BoCollapsible} from "./containers/BoCollapsible"
import moment from "moment";

export const LogsModal = ({showLogs, handleClose}) => {
    const {state} = useContext(sasContext)
    return (
        <Modal size={"xl"} show={showLogs} onHide={handleClose}>
            <Modal.Body>
                <Tabs id="tab-logs">
                    <Tab tabClassName={"logsTabs"} eventKey="application" title="Application">
                        {state.logs.applicationLogs && state.logs.applicationLogs.length > 0
                            ? state.logs.applicationLogs.map((log,index) =>
                            <div key={index}>
                                <LogHeader log={log}/>
                                <pre>{log.message}</pre>
                            </div>)
                            : <h4>Application list is empty</h4>
                        }
                    </Tab>
                    <Tab eventKey="debug" title="Debug">
                        {state.logs.debugData && state.logs.debugData.length > 0
                            ? state.logs.debugData.map((debugLog,index) =>
                                <BoCollapsible
                                    key={index}
                                    logName={`${debugLog.sasProgram.substr(debugLog.sasProgram.lastIndexOf('/')+1)}_${moment(debugLog.time).format('YYYY.MM.DD_HH:mm:ss')}`}
                                    logContent={debugLog.debugText}
                                    title={<LogHeader log={debugLog}/>}
                                    content={() => <div dangerouslySetInnerHTML={{__html:debugLog.debugHtml}}/>}
                                />
                            )
                            : <h4>Debug data is empty</h4>
                        }
                    </Tab>
                    <Tab eventKey="failed" title="Failed requests">
                        {state.logs.failedRequests && state.logs.failedRequests.length > 0
                            ? state.logs.failedRequests.map((failedLog,index) =>
                                <BoCollapsible
                                    key={index}
                                    logName={`${failedLog.sasProgram.substr(failedLog.sasProgram.lastIndexOf('/')+1)}_${moment(failedLog.time).format('YYYY.MM.DD_HH:mm:ss')}`}
                                    logContent={failedLog.responseText}
                                    title={<LogHeader log={failedLog}/>}
                                    content={() => <div dangerouslySetInnerHTML={{__html:failedLog.responseHtml}}/>}
                                />
                            )
                            : <h4>Theres is no failed requests</h4>
                        }
                    </Tab>
                    <Tab eventKey="errors" title="SAS errors">
                        {state.logs.sasErrors && state.logs.sasErrors.length > 0
                            ? state.logs.sasErrors.map((sasError,index) =>
                                <div key={index}>
                                    <LogHeader log={sasError}/>
                                    <pre>{sasError.message}</pre>
                                </div>)
                            : <h4>There is no sas errors</h4>
                        }
                    </Tab>
                </Tabs>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark border-0" onClick={() => {adapterLogs.clear.clearAllLogs(); handleClose()}}>
                    Clear Logs
                </Button>
            </Modal.Footer>
        </Modal>
    )
}