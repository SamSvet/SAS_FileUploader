import React from 'react'

export const CardBodyContainer = React.forwardRef((props, ref) => (
    <div ref={ref}
         className={`card-body pb-0 card__content ${props.className}`}
         style={props.style}
         {...props}
    >
        {props.children}
    </div>
))