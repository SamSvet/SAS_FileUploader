import "./styles/floatLabelInput.css"

export const FloatLabelInput = ({title, name, type, onChange, props}) => (
    <div className={'fli-container'}>
        <input {...props} type={type} autoComplete={"off"} name={name} id={name} required onChange={onChange} className="form-control-plaintext"/>
        <label htmlFor={name} className={"fli-label"}>
            <span className={'fli-content'}>{title}</span>
        </label>
    </div>
)