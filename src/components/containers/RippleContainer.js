import React from 'react'
import "./ripple.css"

export const RippleContainer = ({children, ...props}) => {
    return(
        <div className={'ripple-container'}
            onMouseDown={props.onMouseDown}
        >
            {children}
        </div>
    )
}