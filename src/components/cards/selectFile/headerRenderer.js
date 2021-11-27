import React from "react"

const defaultHeaderRenderer = (errors, sheetData) => {
    return (props) => {
        const innerStyle = (errors.fileInput && errors.fileInput.errData && sheetData.index===0 && errors.fileInput.errData.includes(props.column.name)) ? {color: '#dc3545'} : {}
        return(
            <div style={innerStyle}>{props.column.name}</div>
        )
    }
}

const sberCRMHeaderRenderer = (errors, sheetData) => {
    return (props) => {
        const innerStyle = (errors.fileInput && errors.fileInput.errData && errors.fileInput.sheetName===sheetData.meta.sheetName && errors.fileInput.errData.includes(props.column.name)) ? {color: '#dc3545'} : {}
        return(
            <div style={innerStyle}>{props.column.name}</div>
        )
    }
}

const renderers = {
    SberCRM: sberCRMHeaderRenderer,
    DEFAULT: defaultHeaderRenderer
}

export const headerRenderer = (process, errors, sheetData) => {
    const renderer = renderers[process] || renderers.DEFAULT
    return renderer(errors, sheetData)
}