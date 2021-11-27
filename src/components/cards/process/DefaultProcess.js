import React, {useEffect, useRef} from 'react'
import {useCheck} from "../../../hooks/useCheck"
import {Loader} from "../../Loader"
import {DefaultChecks} from "./DefaultChecks"
import "./fileParams.css"

export const DefaultProcess = ({userProcess, currentProcess, combineFunction, defaultOptions, initialHeight=200}) => {

    const contentRef = useRef(null)
    // const isActive = Object(userProcess).VALUE === currentProcess
    const isActive = userProcess.VALUE === currentProcess
    const {localOptions, isLoading, isLocal} = useCheck(isActive, userProcess.SELECT_CHECKS_STP, currentProcess, combineFunction, defaultOptions)
    const scrollHeight = contentRef.current ? contentRef.current.scrollHeight : initialHeight

    useEffect( () => {
        contentRef.current.style.minHeight = `${initialHeight}px`
    }, [])

    useEffect( () => {
        contentRef.current.style.maxHeight = `${Math.max(contentRef.current.scrollHeight, initialHeight)}px`
    }, [scrollHeight])

    return (
        <div ref={contentRef}
             className={`d-flex justify-content-between container ${!isActive ? 'visually-hidden' : ''} `}
        >
            {
                isLoading
                    ? <Loader/>
                    : <DefaultChecks isActive={isActive} isLocal={isLocal} callBackOnChange={() => {}} options={localOptions} />
            }
        </div>
    )
}