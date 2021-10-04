import React from 'react'

function Collapse(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={props.className}
             width={props.width}
             height={props.height}
             viewBox="0 0 160 160">
            <rect className="vertical-line" x="70" width="20" height="160"/>
            <rect className="horizontal-line" y="70" width="160" height="20"/>
        </svg>
    )
}

export default Collapse