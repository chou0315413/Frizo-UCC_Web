import {getRequest} from '../../utils/uccSender'

export function getUserInfo() {
    return getRequest('/user/me')
}
