import { postRequest, getRequest } from '../../utils/UccSender'

export async function signin(userInfo) {
    return postRequest('/auth/login', userInfo)
}

export function signup({ name, email, password }) {
    return postRequest('/auth/signup', { name, email, password })
}

// 更改密碼 (需要先登入才可以使用)
export function changePassword({ oldPassword, newPassword }) {
    return postRequest('/auth/change/password', { oldPassword, newPassword })
}

// 寄出驗證碼 (到信箱)
export function sendForgotPasswordEmailVerify(email) {
    let params = {
        email: email
    };
    return getRequest('/auth/send/forget/password/verify', params)
}

// 重製密碼 (不需要登入)
export function resetPassword({ email, password, verifyCode }) {
    return postRequest('/auth/reset/password', { email, password, verifyCode })
}