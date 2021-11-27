import React from 'react'

export const FinalResult = ({sasData, ...props}) => {
    if (!(sasData && sasData.data && sasData.data.length)) return null
    return(
        <div style={props.style} className={props.className}>
            <table className={"table table-sm caption-top"}>
                <caption>Список успешно загружен:</caption>
                <thead>
                <tr>
                    <th scope={"col"}/>
                    <th scope={"col"}/>
                </tr>
                </thead>
                <tbody>
                {sasData.data.map((sasrow, idx) =>
                    <tr key={idx}>
                        <td>{sasrow.KEY}</td>
                        <td>{sasrow.VALUE}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}