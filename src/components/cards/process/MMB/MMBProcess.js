import React, {useRef} from 'react'
import "../fileParams.css"
import {Carousel} from "../../../containers/Carousel"
import {DefaultChecks} from "../DefaultChecks"
import {Loader} from "../../../Loader"
import {useCheck} from "../../../../hooks/useCheck"
import {MMBParameters} from "./MMBParameters"

export const MMBProcess = ({channel}) => {
    // const {sasData} = useData()
    // const selectOptions = sasData.selectChecksMMB
    //     ? [{LABEL: 'Базовые проверки', options: [...sasData.selectChecksMMB]}, {LABEL: 'Кастомные процессы', options: [...sasData.selectStpMMB]}]
    //     : [
    //         {LABEL:"Базовые проверки", options: [{ LABEL: 'group1_item1', VALUE: 'group1_item1' }, { LABEL: 'group1_item2', VALUE: 'group1_item2', ISFIXED:1}]},
    //         {LABEL:"Кастомные процессы", options: [{ LABEL: 'group2_item1', VALUE: 'group2_item1' }, { LABEL: 'group2_item2', VALUE: 'group2_item2', ISFIXED:1}]}
    //     ]
    const defaulOptions = [
        {LABEL:"Базовые проверки", options: [{ LABEL: 'group1_item1', VALUE: 'group1_item1' }, { LABEL: 'group1_item2', VALUE: 'group1_item2', ISFIXED:1}]},
        {LABEL:"Кастомные процессы", options: [{ LABEL: 'group2_item1', VALUE: 'group2_item1' }, { LABEL: 'group2_item2', VALUE: 'group2_item2', ISFIXED:1}]}
    ]
    const contentRef = useRef(null)
    const isActive = Object(channel).VALUE === 'import_ext_lists_MMB'
    const {localOptions, isLoading, isLocal} = useCheck(isActive, 'selectChecksMMB', 'selectStpMMB', '/Apps/SASUploader/MMB/selectChecksMMB', defaulOptions)

    // const {setSasValues} = useData()
    // const [isLoading, setIsLoading] = useState(false)
    // const {callSAS} = useContext(sasContext)

    // useEffect(() => {
    //     if (isActive && !sasData.selectChecksMMB){
    //         setIsLoading(true)
    //         callSAS('/Apps/SASUploader/MMB/selectChecksMMB')
    //             .then(result => {
    //                 setSasValues(result)
    //             }).catch(err => { toastr.error('Unable to request /Apps/SASUploader/MMB/selectChecksMMB')})
    //             .finally(() => {setIsLoading(false)})
    //     }
    // }, [isActive])

    const callBackOnChange = () => {
        /*contentRef.current.style.maxHeight = 'none'*/
        /*console.log('callBackOnChange')*/
    }
    return (
        <Carousel maxHeight={450}
                  ref={contentRef}
                  className={!isActive ? 'visually-hidden': ''}
        >
            {
                isLoading
                    ? <Loader/>
                    : <DefaultChecks isActive={isActive} isLocal={isLocal} callBackOnChange={callBackOnChange} options={localOptions} />
            }
            <MMBParameters/>
        </Carousel>
    )
}