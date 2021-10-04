import "./styles/checkbox.css"
import React from "react"

export const CheckBox = ({title, onChange, name}) => (
    <div className={'checkbox-container'}>
        <div className={'checkbox'}>
            <label>
                <input type="checkbox" name={name} onChange={onChange}/>
                <span className={'checkbox-material'}> <span className={'check'}/> </span>
                {title}
            </label>
        </div>
    </div>
)