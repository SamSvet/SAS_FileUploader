import React, {useEffect, useRef} from 'react'
import "../fileParams.css"
import {DefaultChecks} from "../DefaultChecks"
import {useCheck} from "../../../../hooks/useCheck"
import {Loader} from "../../../Loader"

export const ExtListProcess = ({channel, initialHeight=200}) => {
    const defaulOptions = [{
        LABEL: "Group1",
        options: [{LABEL: 'fixed#1_1', VALUE: 'fixed#1_1 : Desription of fixed#1_1 check', ISFIXED: 1},
            {LABEL: 'fixed#2_1', VALUE: 'fixed#2_1 : Desription of fixed#2_1 check', ISFIXED: 1},
            {LABEL: 'optional#1_1', VALUE: 'optional#1_1 : Desription of optional#1_1 check', ISFIXED: 0},
            {LABEL: 'optional#2_1', VALUE: 'optional#2_1 : Desription of optional#2_1 check', ISFIXED: 0},
            {LABEL: 'fixed#3_1', VALUE: 'fixed#3_1 : Desription of fixed#3_1 check', ISFIXED: 1}]
    },
        {
            LABEL:"Group2",
            options: [{ LABEL: 'optional#1_2', VALUE: 'optional#1_2 : Description of optional#1_2 check', ISFIXED: 0 },
            { LABEL: 'fixed#1_2', VALUE: 'fixed#1_2 : Desription of fixed#1_2 check', ISFIXED: 1}]
        },
    ]
    const contentRef = useRef(null)
    const isActive = Object(channel).VALUE === 'import_ext_lists'
    const {localOptions, isLoading, isLocal} = useCheck(isActive, 'selectChecksExtList', 'selectStpExtList', '/Apps/SASUploader/ExtList/selectChecksExtList', defaulOptions)
    const scrollHeight = contentRef.current ? contentRef.current.scrollHeight : initialHeight

    useEffect( () => {
        contentRef.current.style.minHeight = `${initialHeight}px`
    }, [])

    useEffect( () => {
        contentRef.current.style.maxHeight = `${Math.max(contentRef.current.scrollHeight, initialHeight)}px`
    }, [scrollHeight])

    const callBackOnChange = () => {}

    return (
        <div ref={contentRef}
             className={`d-flex justify-content-between container ${!isActive ? 'visually-hidden' : ''} `}
        >
            {
                isLoading
                    ? <Loader/>
                    : <DefaultChecks isActive={isActive} isLocal={isLocal} callBackOnChange={callBackOnChange} options={localOptions} />
            }
        </div>
    )
}