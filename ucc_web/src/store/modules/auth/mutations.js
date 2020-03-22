import * as types from './mutation-types'

// Mutation 裡面的方法必須是同步的
const mutations = {
    [types.SET_IS_LOGIN] (state, isLogin) {
        state.isLogin = isLogin
    },

    [types.SET_USER_INFO] (state, {userName, userId, imgUrl, email, provider}) {
        console.log(`set User Info in mutations`);
        state.userInfo.userName = userName;
        state.userInfo.userId = userId;
        state.userInfo.imgUrl = imgUrl;
        state.userInfo.email = email;
        state.userInfo.provider = provider;
    },
};

export default mutations
