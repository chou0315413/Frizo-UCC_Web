import * as types from './mutation-types'

// Mutation 裡面的方法必須是同步的
const mutations = {
    [types.SET_USER_INFO](state, { userId, name, imgUrl, backgroundUrl, gender, phoneNumber, address,
        collageLocation, collageName, majorSubject, grade, email, provider, emailVerified, createdAt, updatedAt, activelyAcceptFollowRequest }) {
        console.log(`set User Info in mutations`);
        if (userId != null && userId != '') {
            state.userInfo.userId = userId;
        }
        if (name != null && name != '') {
            state.userInfo.name = name;
        }
        if (gender != null && gender != '') {
            state.userInfo.gender = gender;
        }
        if (phoneNumber != null && phoneNumber != '') {
            state.userInfo.phoneNumber = phoneNumber;
        }
        if (address != null && address != '') {
            state.userInfo.address = address;
        }
        if (collageLocation != null && collageLocation != '') {
            state.userInfo.collageLocation = collageLocation;
        }
        if (collageName != null && collageName != '') {
            state.userInfo.collageName = collageName;
        }
        if (majorSubject != null && majorSubject != '') {
            state.userInfo.majorSubject = majorSubject;
        }
        if (grade != null && grade != '') {
            state.userInfo.grade = grade;
        }
        if (email != null && email != '') {
            state.userInfo.email = email;
        }
        if (provider != null && provider != '') {
            state.userInfo.provider = provider;
        }
        if (emailVerified != null && emailVerified != '') {
            state.userInfo.emailVerified = emailVerified;
        }
        if (createdAt != null && createdAt != '') {
            state.userInfo.createdAt = createdAt;
        }
        if (updatedAt != null && updatedAt != '') {
            state.userInfo.updatedAt = updatedAt;
        }
        if (imgUrl != null && imgUrl != '') {
            state.userInfo.imgUrl = imgUrl;
        }
        if (backgroundUrl != null && backgroundUrl != '') {
            state.userInfo.backgroundUrl = backgroundUrl;
        }
        if (activelyAcceptFollowRequest != null && activelyAcceptFollowRequest != '') {
            state.userInfo.activelyAcceptFollowRequest = activelyAcceptFollowRequest;
        }
    },
};

export default mutations
