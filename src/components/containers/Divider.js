import React from 'react'
import "./divider.css"

export const Divider = ({children, ...props}) => (
    <div
        className={`container-divider px-2 ${props.className}`}
        style={props.style}
        {...props}
    >
        {children}
    </div>
)