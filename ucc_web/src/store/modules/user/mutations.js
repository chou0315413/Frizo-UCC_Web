import * as types from './mutation-types'

// Mutation 裡面的方法必須是同步的
const mutations = {
    [types.SET_USER_INFO](state, { userId, userName, imgUrl, backgroundUrl, gender, phoneNumber, address,
        collageLocation, collageName, majorSubject, grade, email, provider, emailVerified, createdAt, updatedAt }) {
        console.log(`set User Info in mutations`);
        state.userInfo.userId = userId;
        state.userInfo.userName = userName;
        state.userInfo.backgroundUrl = backgroundUrl;
        state.userInfo.gender = gender;
        state.userInfo.phoneNumber = phoneNumber;
        state.userInfo.address = address;
        state.userInfo.collageLocation = collageLocation;
        state.userInfo.collageName = collageName;
        state.userInfo.majorSubject = majorSubject;
        state.userInfo.grade = grade;
        state.userInfo.imgUrl = imgUrl;
        state.userInfo.email = email;
        state.userInfo.provider = provider;
        state.userInfo.emailVerified = emailVerified;
        state.userInfo.createdAt = createdAt;
        state.userInfo.updatedAt = updatedAt;
    },
};

export default mutations
