import {useContext, useEffect, useState} from 'react'
import {useData} from "../context/DataContext"
import {sasContext} from "../context/adapterSAS/sasContext"

export const useCheck = (isActive, checkSelectName, stpSelectName, sasProgram, defaultOptions) => {
    const {setSasValues} = useData()
    const [isLoading ,setIsLoading] = useState(false)
    const [isLocal ,setIsLocal] = useState(true)
    const [attempCnt ,setAttempCnt] = useState(0)
    const [localOptions, setLocalOptions] = useState([{}])
    const {callSAS} = useContext(sasContext)

    useEffect(() => {
        if (isActive && attempCnt === 0){
            setIsLoading(true)
            callSAS(sasProgram)
                .then(result => {
                    setLocalOptions([{LABEL: 'Базовые проверки', options: result[checkSelectName]}, {LABEL: 'Кастомные процессы', options: result[stpSelectName]}])
                    setSasValues(result)
                    setIsLocal(false)
                })
                .catch(err => {
                    setLocalOptions(defaultOptions)
                })
                .finally(() => {
                    setIsLoading(false)
                    setAttempCnt(prev => prev+1)
                })
        }
    }, [isActive])

    return {localOptions, isLoading, isLocal}
}