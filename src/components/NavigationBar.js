import React, {useEffect, useState, useCallback} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import logo from "../logo/SAS64.svg.png"
import {Button, ButtonGroup} from "react-bootstrap"
import {LogsModal} from "./LogsModal"
import {ToggleCheck} from "./ToggleCheck"
import sasAdapterService from "../context/adapterSAS/sasAdapterService"
import {Question} from "./tour/Question"


export const NavigationBar = () => {
    let initialDebugMode = localStorage.getItem('debugMode')
    initialDebugMode = initialDebugMode ? JSON.parse(initialDebugMode) : false
    const [state, setState] = useState({showLogs: false, debugMode: initialDebugMode})
    const [clickCount, setClickCount] = useState(0)

    const handleDebugMode = () => {
        setState((prev) => ({...prev, debugMode:!prev.debugMode}))
    }

    const handleClose = useCallback(() => {
        setState((prev) => ({...prev, showLogs:false}))
    }, [state.showLogs])

    useEffect(() => {
        sasAdapterService.setDebugMode(state.debugMode)
    }, [state.debugMode])

    return (
        <>
            <Navbar bg="light" sticky="top" variant="light" expand={"lg"} className={"border"} tour="target-0">
                <Navbar.Brand href="#home" tour="target-1">
                    <img
                        alt=""
                        src={logo}
                        width="64"
                        height="26"
                        className="d-inline-block align-top"
                    />{' '}
                    File Uploader
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <ButtonGroup>
                        <div className={"switch_input-group-text"}>
                            <span>Debug&nbsp;
                                <ToggleCheck checked={state.debugMode} onChange={handleDebugMode} id="switchDebug" style={{display: 'inline-table'}}/>
                            </span>
                        </div>
                        <Button variant="outline-dark border-top-0 border-bottom-0"
                                onClick={() => setState((prev) => ({...prev, showLogs:true}))}
                        >&nbsp;Logs&nbsp;</Button>
                        <Button onClick={() => setClickCount(prev => prev+1)} variant="outline-dark border-0">&nbsp;&nbsp;?&nbsp;&nbsp;</Button>
                    </ButtonGroup>
                </Navbar.Collapse>
            </Navbar>
            <LogsModal showLogs={state.showLogs} handleClose={handleClose}/>
            <Question clickCount={clickCount} />
        </>
    )
}