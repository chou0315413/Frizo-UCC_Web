import * as types from './mutation-types'
import { getUserInfo } from "@/api/user";
import { authenticated, cleanAuthStore } from "@/utils/AuthStore";

const setUserInfo = function ({ commit }) {
    if (authenticated()) {
        getUserInfo()
            .then(res => {
                let userInfo = {
                    userId: res.data.id,
                    name: res.data.name,
                    backgroundUrl: res.data.backgroundUrl,
                    gender: res.data.gender,
                    phoneNumber: res.data.phoneNumber,
                    address: res.data.address,
                    collageLocation: res.data.collageLocation,
                    collageName: res.data.collageName,
                    majorSubject: res.data.majorSubject,
                    grade: res.data.grade,
                    createdAt: res.data.createdAt,
                    updatedAt: res.data.updatedAt,
                    email: res.data.email,
                    imgUrl: res.data.imageUrl,
                    provider: res.data.provider,
                    emailVerified: res.data.emailVerified
                };
                if (userInfo.phoneNumber != '') {
                    userInfo.phoneNumber = '0' + userInfo.phoneNumber
                }
                console.log("user actions: " + userInfo.name + ": " + userInfo.email);
                commit(types.SET_USER_INFO, userInfo)
            })
            .catch(error => {
                alert('使用者憑證過期，請重新登入');
                cleanAuthStore();
                console.log('user not login');
                console.log(error)
            })
    }
};

const setUserInfoFromObj = function ({ commit }, { id, name, imageUrl, backgroundUrl, gender, phoneNumber, address,
    collageLocation, collageName, majorSubject, grade, email, provider, emailVerified, createdAt, updatedAt }) {
    if (authenticated()) {
        let userInfo = {
            userId: id,
            name: name,
            gender: gender,
            phoneNumber: phoneNumber,
            address: address,
            collageLocation: collageLocation,
            collageName: collageName,
            majorSubject: majorSubject,
            grade: grade,
            createdAt: createdAt,
            updatedAt: updatedAt,
            email: email,
            provider: provider,
            emailVerified: emailVerified,
            imgUrl: imageUrl,
            backgroundUrl: backgroundUrl,
        };
        commit(types.SET_USER_INFO, userInfo)
    }
};



const actions = {
    setUserInfo,
    setUserInfoFromObj,
};

export default actions