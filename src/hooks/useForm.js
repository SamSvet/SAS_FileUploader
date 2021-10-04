import {useEffect, useState} from 'react'
import moment from 'moment'
import {useData} from "../context/DataContext"

const useForm = () => {
    const {setValues} = useData()
    const [localData, setLocalData] = useState({})
    //const [localErrors, setLocalErrors] = useState({})
    useEffect(() => {
        setValues(localData)
    }, [localData])

    // useEffect(() => {
    //     validateErrors(localErrors)
    // }, [localErrors])
    //
    // const handleError = (validateFunc) => {
    //     setLocalErrors({...validateFunc(data)})
    // }

    const handleChange = (e) => {
        e.persist()
        setLocalData(prevLocalData => ({...prevLocalData, [e.target.name]: e.target.value}))
    }
    const handleChangeDttm = (dttm, dttmFormat, name) => {
        setLocalData(prevLocalData => ({...prevLocalData, [name]: moment(dttm).format(dttmFormat)}))
    }
    const handleChangeSelect = (e, name) => {
        setLocalData(prevLocalData => ({...prevLocalData, [name]: e}))
    }
    const handleChangeCheck = (e) => {
        setLocalData(prevLocalData => ({...prevLocalData, [e.target.name]: e.target.checked ? 1 : 0}))
    }

    return {localData, handleChange, handleChangeDttm, handleChangeSelect, handleChangeCheck}
}

export default useForm