import React from "react"
import {useData} from "../../../context/DataContext"

export const PreviewFile = ({fileData}) => {
    const {errors} = useData()

    return (
        <>
            {fileData.data.length>0 &&
            <>
                {fileData.meta.delimiter && <small>Delimiter - <code>{fileData.meta.delimiter}</code>&nbsp;</small>}
                {fileData.meta.linebreak && <small>&nbsp;Line break - <code>{JSON.stringify(fileData.meta.linebreak).slice(1,-1)}</code>&nbsp;</small>}
                <small>&nbsp;Rows - <code>{fileData.data.length}</code>&nbsp;</small>
                <small>&nbsp;Size - <code>{fileData.myfile.size}</code>&nbsp;</small>
                <h5><small className="text-muted">Первые 10 строк</small></h5>
                <p/>
            </>
            }
            <table className="table table-sm " style={{fontSize: "0.5rem"}}>
                <thead>
                <tr>
                    { fileData.meta.fields.map((field,idx) => {
                        const innerStyle = (errors.fileInput && errors.fileInput.errData && errors.fileInput.errData.includes(field)) ? {color: '#dc3545'} : {}
                        return <th key={idx} style={innerStyle}>{field}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {fileData.data.map((row,idx) =>
                    <tr key={idx}>
                        {Object.values(row).map((v,idx) => <td key={idx}>{v}</td>)}
                    </tr>
                )}
                </tbody>
            </table>
        </>
    )
}