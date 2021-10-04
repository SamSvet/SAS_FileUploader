import React from 'react'
import moment from 'moment'

export const LogHeader = (props) => {
    const {log} = props
    if (log) {
        const title = log.sasProgram === undefined ? 'Unknown service name' : log.sasProgram
        const time = !(log && log.time) ? 'Unknown service time' : moment(log.time).format('YYYY.MM.DD  HH:mm:ss')
        return <div>{title}  {time}</div>
    }
    return null
}