import {getRequest, postRequest} from '../../utils/UccSender'

export function getUserInfo() {
    return getRequest('/user/me')
}

export function sendVerifyCodeEmail() {
    return getRequest('/user/send/email/verify')
}

export function checkVerifyCodeEmail(code) {
    let params = {
        verifyCode: code
    }
    return postRequest('/user/check/email/verify', params)
}
