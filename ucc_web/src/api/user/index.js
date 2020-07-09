import {
  getRequest,
  postRequest,
  uploadFileRequest,
} from "../../utils/UccSender";

export const getUserInfo = () => getRequest("/user/me");

export const sendVerifyCodeEmail = () => getRequest("/user/send/email/verify");

export const checkVerifyCodeEmail = (code) => {
  let params = {
    verifyCode: code,
  };
  return getRequest("/user/check/email/verify", params);
};

// 更新 User Profile 的 API。(不包括 avatar 與 background)
export const updateUserInfo = ({
  address,
  collageLocation,
  collageName,
  gender,
  grade,
  majorSubject,
  name,
  phoneNumber,
}) => {
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
  return postRequest(actionUrl, params);
};

// 上傳照片 API
export const updateUserAvatar = (avatar) => {
  if (avatar == null) {
    return;
  }
  let actionUrl = "/user/update/avatar";
  let formData = new FormData();
  formData.append("avatar", avatar);
  return uploadFileRequest(actionUrl, formData);
};

// 上傳 bg API
export const updateProfileBackground = (background) => {
  if (background == null) {
    return;
  }
  let actionUrl = "/user/update/background";
  let formData = new FormData();
  formData.append("background", background);
  return uploadFileRequest(actionUrl, formData);
};

// 尋找使用者 API
export const findUser = (keywords, page) => {
  let actionUrl = "/user/find";
  let params = {};

  if (keywords == null || keywords == "") {
    return;
  } else {
    params.keywords = keywords;
  }

  if (page == null || page == "") {
    params.page = 10;
  } else {
    params.page = page;
  }

  return getRequest(actionUrl, params);
};

//取得使用者資料 API
export const getOtherUserInfo = (userId) => {
  let actionUrl = "user/get/info/?id=" + userId;
  let params = {};
  if (userId == null) {
    return;
  } else {
    params.userId = userId;
  }

  return getRequest(actionUrl, params);
};

//發送追蹤請求 API
export const sendFllowingRequest = (fowllowingUserId) => {
  let actionUrl = "following/send/request/?id=" + fowllowingUserId;
  let params = {};
  if (typeof fowllowingUserId != Number) {
    return;
  } else {
    params.fowllowingUserId = fowllowingUserId;
  }

  return getRequest(actionUrl, params);
};

//使用者被追蹤設定 API
export const userFollowedSetting = (isAllow) => {
  let actionUrl = "user/setting/auto/accept/following";
  let params = {};
  if (isAllow != null) {
    params.isAllow = isAllow;
  }
  return getRequest(actionUrl, params);
};
