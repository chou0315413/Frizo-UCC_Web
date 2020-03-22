import * as types from './mutation-types'
import {getUserInfo} from "../../../api/user";

const login = async function ({dispatch}, {tokenType, accessToken}) {
    console.log(`tokenType: ${tokenType}`);
    console.log(`accessToken: ${accessToken}`);
    localStorage.clear();
    localStorage.setItem('authToken', `${tokenType} ${accessToken}`);
    await dispatch('setUserInfo')
};

const logout = async function ({commit}) {
    commit(types.SET_IS_LOGIN, false);
    localStorage.clear();
    window.location.reload()
};

const setUserInfo = function ({commit}) {
    getUserInfo()
        .then(res => {
        let userInfo = {
            userName: res.data.name,
            userId: res.data.id,
            email: res.data.email,
            imgUrl: res.data.imageUrl,
            provider: res.data.provider,
        };
        console.log("in actions: " + userInfo.userName + " " + userInfo.email);
        commit(types.SET_IS_LOGIN, true);
        commit('setUserInfo', userInfo)
    })
        .catch(error => {
            commit(types.SET_IS_LOGIN, false);
            console.log('user not login');
            console.log(error)
        })
};

const actions = {
    login,
    setUserInfo,
    logout
};

export default actions