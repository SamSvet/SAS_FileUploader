import React from "react"

export const LoadingButton = ({children, ...props}) => (
    <button type="button"
            disabled={props.loading || props.disabled}
            style={props.style}
            className={`btn btn-outline-dark text-start ${props.className}`}
            onClick={(event) => props.onClick(event)}
    >
        {children}
        {props.loading && <span className={"spinner-border spinner-border-sm"} role={'status'} aria-hidden={'true'}/>}
    </button>
)