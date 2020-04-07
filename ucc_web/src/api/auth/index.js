import {postRequest} from '../../utils/UccSender'

export async function signin(userInfo) {
    return postRequest('/auth/login', userInfo)
}

export function signup({name, email, password}) {
    return postRequest('/auth/signup', {name, email, password})
}