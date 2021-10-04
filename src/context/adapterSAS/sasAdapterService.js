import H54s from 'h54s'
import {setRequest} from "./sasAdapterActions"
import toastr from "toastr"

toastr.options = {
    "positionClass": "toast-top-center",
    "timeOut": "3000",
    "progressBar": true
}
// toastr.options = {
//
//     toastClass: 'alert',
//     iconClass: {
//         error: 'alert-error',
//         info: 'alert-info',
//         success: 'alert-success',
//         warning: 'alert-warning'
//     }
// }

class sasAdapterService {
    constructor() {
        this.requests = new Map();
        this.shouldLogin = true;
        this._adapter = new H54s({
            ajaxTimeout: 120000,
            sasVersion: 'v9', // could be 'v9' or 'viya'
            maxXhrRetries: 0
        });

        // Set debug mode
        let debugMode = localStorage.getItem('debugMode')
        if (debugMode) {
            debugMode = JSON.parse(debugMode)
        }
        this.setDebugMode(debugMode || false)
    }

    setDebugMode(debugMode) {
        localStorage.setItem("debugMode", debugMode)
        this._debugMode = this._adapter.debug = debugMode
    }

    getDebugMode() {
        return this._debugMode
    }

    handleUserMessage(res) {
        if (res.usermessage && res.usermessage !== 'blank') {
            toastr.success(res.usermessage)
        }
    }

    _callback(err, res, resolve, reject, dispatch, program) {
        if (err) {
            if (err.type === 'notLoggedinError') {
                // setShouldLogin(dispatch, true)
                // console.log("setShouldLogin(dispatch, true)")
                toastr.info("You should refresh SAS Home page")
            } else if (!!err) {
                toastr.error(`${program} ${err.message}`)
                return reject(err)
            }
        } else if (!err && res) {
            this.handleUserMessage(res)
            return resolve(res)
        }
    }

    _handleRequest(dispatch, promise, program) {
        // console.log('sasAdapterService _handleRequest initial')
        setRequest(dispatch, promise, {
            program,
            running: true,
            successful: undefined
        })

        promise.then(() => {
            // console.log('sasAdapterService _handleRequest success')
            setRequest(dispatch, promise, {
                running: false,
                successful: true,
                timestamp: new Date()
            })
        }).catch(() => {
            // console.log('sasAdapterService _handleRequest error')
            setRequest(dispatch, promise, {
                running: false,
                successful: false,
                timestamp: new Date()
            })
        })
    }

    // Function that directly invoke SAS program call
    call(dispatch, program, tables) {
        const promise = new Promise((resolve, reject) => {
            this._adapter.call(program, tables, (err, res) => this._callback(err, res, resolve, reject, dispatch, program))
        })

        this._handleRequest(dispatch, promise, program)

        return promise
    }

}
export default new sasAdapterService()