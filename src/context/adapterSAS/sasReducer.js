import {sasActionTypes} from "./sasActionTypes"
import * as adapterLogs from 'h54s/src/logs'

// const initialState = {
//     requests: new Map(),
//     logs: adapterLogs.get.getAllLogs(),
//     loading: false
// }

const handlers = {
    [sasActionTypes.SET_REQUEST]: (state, action) => {
        // console.log(state)
        // console.log(action)
        const newRequests = new Map(state.requests.entries())
        const newLogs = adapterLogs.get.getAllLogs()
        const newParams = Object.assign({},newRequests.get(action.payload.promise), action.payload.params )
        newRequests.set(action.payload.promise, newParams)
        return {...state, requests: state.requests, logs: newLogs}
    },
    [sasActionTypes.REMOVE_REQUEST]: (state, action) => {
        const requestsToRemove = new Map(state.requests.entries())
        requestsToRemove.delete(action.payload)
        return {...state, requests: requestsToRemove}
    },
    [sasActionTypes.SHOW_LOADER]: (state) => ({...state, loading: true}),
    [sasActionTypes.HIDE_LOADER]: (state) => ({...state, loading: false}),
    DEFAULT: state => state
}

export const sasReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}