import {tourActionTypes} from "./tourActionTypes"

const handlers = {
    [tourActionTypes.START]: (state) => ({...state, run: true}),
    [tourActionTypes.RESET]: (state) => ({...state, stepIndex: 0}),
    [tourActionTypes.STOP]: (state) => ({...state, run: false}),
    [tourActionTypes.NEXT_OR_PREV]: (state, action) => ({...state, ...action.payload}),
    [tourActionTypes.RESTART]: (state) => ({...state, stepIndex:0, run: true, loading: false, key: new Date()}),
    DEFAULT: state => state
}

export const tourReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}