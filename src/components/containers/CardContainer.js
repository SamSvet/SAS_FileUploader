import React from 'react'

export const CardContainer = ({children, ...props}) => (
    <div
        className={`container-fluid card overflow-hidden pt-3 ${props.className}`}
        style={props.style}
        onDragOver={props.isDragZone === true ? (event) => props.dragOverCallBack(event) : null}
        onDrop={props.isDragZone === true ? (event) => props.dropCallBack(event) : null}
        onDragEnter={props.isDragZone === true ? (event) => props.dragEnterCallBack(event) : null}
        onDragLeave={props.isDragZone === true ? (event) => props.dragLeaveCallBack(event) : null}
    >
        {children}
    </div>
)