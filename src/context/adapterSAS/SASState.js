import React, {useReducer} from "react"
import {sasContext} from "./sasContext"
import {sasReducer} from "./sasReducer"
import {getAllLogs} from "./sasActionTypes"
import sasAdapterService from "./sasAdapterService"
import {showLoader, hideLoader} from "./sasAdapterActions"

export const SASState = ({children}) => {
    const initialState = {
        requests: new Map(),
        logs: getAllLogs(),
        loading: false
    }

    const [state, dispatch] = useReducer(sasReducer, initialState)

    const showLoading = () => {showLoader(dispatch)}
    const hideLoading = () => {hideLoader(dispatch)}

    const callSAS = async (program, tables ) => {
        showLoader(dispatch)
        try {
            let callData = await sasAdapterService.call(dispatch, program, tables)
            if (typeof callData === 'string') { callData = JSON.parse(callData)}
            return callData
        }
        catch (e){
            throw new Error(e.message)
        }
        finally {
            hideLoader(dispatch)
        }
    }

    // const callSAS2 = async (program, tables) => {
    //     showLoader(dispatch)
    //     setTimeout(async () => {
    //         try {
    //             let callData = await sasAdapterService.call(dispatch, program, tables)
    //             if (typeof callData === 'string') { callData = JSON.parse(callData)}
    //             return callData
    //         }
    //         catch (e){
    //             throw new Error(e.message)
    //         }
    //         finally {
    //             hideLoader(dispatch)
    //         }
    //     }, 1000)
    // }

    return (
        <sasContext.Provider value={{
            callSAS, state, loading:state.loading, showLoading, hideLoading
        }}>
            {children}
        </sasContext.Provider>
    )
}