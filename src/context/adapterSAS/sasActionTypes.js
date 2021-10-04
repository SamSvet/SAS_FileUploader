export const sasActionTypes = {
    SET_REQUEST: 'SET_REQUEST',
    REMOVE_REQUEST: 'REMOVE_REQUEST',
    SHOW_LOADER: 'SHOW_LOADER',
    HIDE_LOADER: 'HIDE_LOADER'
}

const logs = {
    applicationLogs: [],
    debugData: [],
    sasErrors: [],
    failedRequests: []
};

export const getAllLogs = () => {
    return {
        sasErrors: logs.sasErrors,
        applicationLogs: logs.applicationLogs,
        debugData: logs.debugData,
        failedRequests: logs.failedRequests
    }
}