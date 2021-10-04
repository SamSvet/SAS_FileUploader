import React, {createContext, useContext, useState} from 'react'

const DataContext = createContext()

export const DataProvider = ({children}) => {
    const [data, setData] = useState({})
    const [sasData, setSasData] = useState({})
    const [errors, setErrors] = useState({})

    const setValues = (values) => {
        setData((prevData) => ({
            ...prevData,
            ...values
        }))
    }

    const setSasValues = (values) => {
        setSasData((prevData) => ({
            ...prevData,
            ...values
        }))
    }

    const setErrorValues = (validateInfo) => {
        setErrors((prevErrors) => ({
            ...validateInfo(data)
        }))
    }

    return <DataContext.Provider value={{data, setValues, errors, setErrorValues, sasData, setSasValues}}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)