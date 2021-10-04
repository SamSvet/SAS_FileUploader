import React, {useMemo} from "react"
import ReactDataGrid from "react-data-grid"
import "../../styles/reactDataGrid.css"
import {useData} from "../../../context/DataContext"

export const DataGridPreview = ({fileData, columnHeight=35}) => {
    const {errors} = useData()

    const HeaderRenderer = (props) => {
        const innerStyle = (errors.fileInput && errors.fileInput.errData && errors.fileInput.errData.includes(props.column.name)) ? {color: '#dc3545'} : {}
        return(
            <div style={innerStyle}>{props.column.name}</div>
        )
    }

    const defaultColumnProperties = {
        resizable: true,
        width: 120,
        headerRenderer: HeaderRenderer
    }

    const columns = useMemo(() => {
        return fileData.meta.fields.map((el => ({key: el, name: el}))).map(c => ({ ...c, ...defaultColumnProperties }))
    }, [fileData.meta.fields, errors.fileInput])

    return (
        <>
            {/* {fileData.data.length && <small>Rows - <code>{fileData.data.length}</code>&nbsp;</small>} */}
            {fileData.myfile && fileData.myfile.size && <small>&nbsp;Size - <code>{fileData.myfile.size}</code>&nbsp;</small>}
            {fileData.meta.delimiter && <small>Delimiter - <code>{fileData.meta.delimiter}</code>&nbsp;</small>}
            {fileData.meta.linebreak && <small>&nbsp;Line break - <code>{JSON.stringify(fileData.meta.linebreak).slice(1,-1)}</code>&nbsp;</small>}
            <h5><small className="text-muted">First 10 rows</small></h5>
            <p/>
            <ReactDataGrid
                style={{height: `${(fileData.data.length + 1)*columnHeight + 5}px`}}
                columns={columns}
                rows={fileData.data}
            />
        </>
    )
}