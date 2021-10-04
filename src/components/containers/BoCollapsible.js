import React, {useState, useRef, useEffect} from "react"
import "../styles/bocollapsible.css"
import Collapse from "../Collapse"
import Export from "../Export"

export const BoCollapsible = ({children, ...props}) => {
    const [exported, setExported] = useState(false)
    const hRef = useRef(null)
    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        hRef.current.setAttribute("href", '')
    }, [exported])

    const exportLog = () => {
        const logContent = "data:text/csv;charset=utf-8," + encodeURIComponent(props.logContent)
        hRef.current.setAttribute("href", logContent)
        hRef.current.click()
        setExported(true)
    }

    return (
        <div className={'boCollapsible'}>
            <button className={`float-end btn btn-sm btn-link no-outline export-btn`} onClick={exportLog}>
                <Export height={20} fill={"#343a30"} className={'export-icon'}/>
                <a ref={hRef} download={`${props.logName}.log`} />
            </button>
            <div className={'title'} onClick={() => setCollapsed( prev => !prev)}>
                <Collapse width={15} height={15} className={`plus ${collapsed ? 'minus' : ''}`}/>
                {typeof props.title === 'function' ? props.title() : props.title}
            </div>

            <div className={`content ${collapsed ? 'open' : ''}`}>
                {typeof props.content === 'function' ? props.content() : props.content}
                {/*{children}*/}
            </div>
        </div>
    )
}