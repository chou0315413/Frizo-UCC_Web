import { getRequest, postRequest, uploadFileRequest } from '../../utils/UccSender'

export const getUserInfo = () => getRequest('/user/me');

export const sendVerifyCodeEmail = () => getRequest('/user/send/email/verify');

export const checkVerifyCodeEmail = code => {
    let params = {
        verifyCode: code
    };
    return postRequest('/user/check/email/verify', params)
};


// 更新 User Profile 的 API。
export const updateUserInfo = ({ address, avatar, background, collageLocation, collageName, gender, grade, majorSubject, name, phoneNumber }) => {
    let actionUrl = "/user/update/userinfo";
    let formData = new FormData();
    formData.append('name', name);
    if (avatar != null) {
        formData.append('avatar', avatar);
    }
    if (background != null) {
        formData.append('background', background);
    }
    formData.append('gender', gender);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('collageLocation', collageLocation);
    formData.append('collageName', collageName);
    formData.append('majorSubject', majorSubject);
    formData.append('grade', grade);
    return uploadFileRequest(actionUrl, formData)
};
