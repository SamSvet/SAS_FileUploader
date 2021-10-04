import React from 'react'
import "./styles/toggleCheck.css"

export const ToggleCheck = (props) => {
    return (
        <div className={`switch ${props.className}`}
             style={props.style}
             height={props.height}
             width={props.width}>
            <input onChange={props.onChange} id={props.id} type="checkbox" className="switch-input" checked={props.checked}/>
            <label htmlFor={props.id} className="switch-label">&nbsp;</label>
        </div>
    )
}