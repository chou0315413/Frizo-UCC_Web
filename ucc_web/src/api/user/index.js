import { getRequest, postRequest, uploadFileRequest } from '../../utils/UccSender'

export const getUserInfo = () => getRequest('/user/me');

export const sendVerifyCodeEmail = () => getRequest('/user/send/email/verify');

export const checkVerifyCodeEmail = code => {
    let params = {
        verifyCode: code
    };
    return getRequest('/user/check/email/verify', params)
};


<<<<<<< HEAD
// 更新 User Profile 的 API。使用 formData
export const updateUserInfo = ({address, avatar, background, collageLocation, collageName, gender, grade, majorSubject, name, phoneNumber}) => {
=======
// 更新 User Profile 的 API。(不包括 avatar 與 background)
export const updateUserInfo = ({ address, collageLocation, collageName, gender, grade, majorSubject, name, phoneNumber }) => {
>>>>>>> 1b353da885b6b37ceb1a36bda670f13b845677a9
    let actionUrl = "/user/update/userinfo";
    let params = {};
    if (name != null) {
        params.name = name;
    }
    if (address != null) {
        params.address = address;
    }
    if (collageLocation != null) {
        params.collageLocation = collageLocation;
    }
    if (collageName != null) {
        params.collageName = collageName;
    }
    if (gender != null) {
        params.gender = gender;
    }
    if (grade != null) {
        params.grade = grade;
    }
    if (majorSubject != null) {
        params.majorSubject = majorSubject;
    }
    if (phoneNumber != null) {
        params.phoneNumber = phoneNumber;
    }
    return postRequest(actionUrl, params)
};

// 上傳照片 API
export const updateUserAvatar = (avatar) => {
    if (avatar == null) {
        return;
    }
    let actionUrl = "/user/update/avatar";
    let formData = new FormData();
    formData.append('avatar', avatar);
    return uploadFileRequest(actionUrl, formData)
};

// 上傳 bg API
export const updateProfileBackground = (background) => {
    if (background == null) {
        return;
    }
    let actionUrl = "/user/update/background";
    let formData = new FormData();
    formData.append('background', background);
    return uploadFileRequest(actionUrl, formData)
};
