import React, {useMemo} from "react"
import ReactDataGrid from "react-data-grid"
// import "../../styles/reactDataGrid.css"
import {useData} from "../../../context/DataContext"
import {headerRenderer} from "./headerRenderer"

export const DataGridPreview = ({fileData, sheetData, columnHeight=35}) => {
    const {data, errors} = useData()

    // const HeaderRenderer = (props) => {
    //     const innerStyle = (errors.fileInput && errors.fileInput.errData && errors.fileInput.errData.includes(props.column.name)) ? {color: '#dc3545'} : {}
    //     return(
    //         <div style={innerStyle}>{props.column.name}</div>
    //     )
    // }

    const defaultColumnProperties = {
        resizable: true,
        width: 120,
        headerRenderer: headerRenderer(data.fileParamsType ? data.fileParamsType[0].VALUE : '', errors, sheetData)
    }

    const columns = useMemo(() => {
        return sheetData.meta.fields.map((el => ({key: el, name: el}))).map(c => ({ ...c, ...defaultColumnProperties }))
    }, [sheetData.meta.fields, errors.fileInput])

    return (
        <>
            {fileData && fileData.size && <small>File size - <code>{fileData.size}</code>&nbsp;</small>}
            {sheetData.meta.delimiter && <small>&nbsp;Column delimiter - <code>{sheetData.meta.delimiter}</code>&nbsp;</small>}
            {sheetData.meta.linebreak && <small>&nbsp;Row delimiter - <code>{JSON.stringify(sheetData.meta.linebreak).slice(1,-1)}</code>&nbsp;</small>}
            {sheetData.meta.sheetName && <small>&nbsp;Sheet - <code>{sheetData.meta.sheetName}</code>&nbsp;</small>}
            <h5><small className="text-muted">First 10 rows</small></h5>
            <p/>
            <ReactDataGrid
                style={{height: `${(sheetData.data.length + 1)*columnHeight + 20}px`}}
                columns={columns}
                rows={sheetData.data}
            />
        </>
    )
}