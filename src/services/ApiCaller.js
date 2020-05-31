import { call } from 'redux-saga/effects'
import * as _ from 'lodash'

function* callServer(
    apiFunction,
    reqData,
    showError = true,
    id = null
)  {
        reqData = reqData || {}
        const response = yield call(apiFunction, reqData, reqData.id || id);
        const {
            status = 200,
            data: resData = null,
            ok = false,
            problem = 'TIMEOUT_ERROR'
        } = response || {}

        if (ok && status && status >= 200 && status <= 300) {
            return { error: false, res: resData, statusCode: status }
        } else {
            let message = ''
            if (resData) {
                if (typeof resData.error === 'object' && resData.error.message) {
                    message = resData.error.message
                } else if (typeof resData.error === 'string') {
                    message = resData.error
                } else if (resData.message) {
                    message = resData.message
                } else if (resData.msg) {
                    message = resData.msg
                } else if (_.isString(resData)) {
                    message = resData
                } else {
                    message = getMessage(resData)
                }
            } else {
                message = getMessage(problem)
            }
            if (showError) {
                console.log(message)
            }
            const { data = {} } = resData
            throw { error: true, message, statusCode: status, data }
        }
    }

const getMessage = (error) => {
    if (error === 'TIMEOUT_ERROR') {
        return 'No Response From Server.'
    } else if (error === 'CONNECTION_ERROR') {
        return 'Server Is Not Available.'
    } else if (error === 'NETWORK_ERROR') {
        return 'Network not available.'
    } else {
        return 'Something went wrong. Please try again'
    }
}

export default {
    callServer
}
