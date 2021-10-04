import {sasActionTypes} from "./sasActionTypes"

export function setRequest(dispatch, promise, params) {
    dispatch({
        type: sasActionTypes.SET_REQUEST,
        payload: {promise, params}
    })
}

export function removeRequest(dispatch, promise) {
    dispatch({
        type: sasActionTypes.REMOVE_REQUEST,
        payload: promise
    })
}

export function showLoader(dispatch) {
    dispatch({type: sasActionTypes.SHOW_LOADER})
}

export function hideLoader(dispatch) {
    dispatch({type: sasActionTypes.HIDE_LOADER})
}

export function sleep(milliseconds) {
    const date = Date.now()
    let currentDate = null
    do {
        currentDate = Date.now()
    } while (currentDate - date < milliseconds)
}