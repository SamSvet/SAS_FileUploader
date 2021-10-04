import React from 'react'

export const CardHeaderContainer = ({children, ...props}) => (
    <div
        className={`card-header shadow  ${props.className}`}
        style={props.style}
        {...props}
    >
        {children}
    </div>
)