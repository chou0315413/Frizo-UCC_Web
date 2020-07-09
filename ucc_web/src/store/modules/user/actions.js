import * as types from './mutation-types'
import { getUserInfo } from "@/api/user";
import { authenticated, cleanAuthStore } from "@/utils/AuthStore";

const setUserInfo = function ({ commit }) {
    if (authenticated()) {
        getUserInfo()
            .then(res => {
                if (res.data.success) {
                    let userInfo = {
                        userId: res.data.result.id,
                        name: res.data.result.name,
                        backgroundUrl: res.data.result.backgroundUrl,
                        gender: res.data.result.gender,
                        phoneNumber: res.data.result.phoneNumber,
                        address: res.data.result.address,
                        collageLocation: res.data.result.collageLocation,
                        collageName: res.data.result.collageName,
                        majorSubject: res.data.result.majorSubject,
                        grade: res.data.result.grade,
                        createdAt: res.data.result.createdAt,
                        updatedAt: res.data.result.updatedAt,
                        email: res.data.result.email,
                        imgUrl: res.data.result.imageUrl,
                        provider: res.data.result.provider,
                        emailVerified: res.data.result.emailVerified,
                        activelyAcceptFollowRequest: res.data.result.activelyAcceptFollowRequest
                    };
                    if (userInfo.phoneNumber != '') {
                        userInfo.phoneNumber = '0' + userInfo.phoneNumber
                    }
                    console.log("user actions: " + userInfo.name + ": " + userInfo.email);
                    commit(types.SET_USER_INFO, userInfo)
                } else {
                    alert(res.data.message)
                }

            })
            .catch(error => {
                alert(error.response.data.message);
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