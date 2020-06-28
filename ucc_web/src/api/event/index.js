import {
  uploadFileRequest,
  postRequest,
  getRequest,
  deleteRequest,
} from "../../utils/UccSender";

// 新增 Event(活動) 的 API。
export const createEvent = ({
  title,
  description,
  dmPicture,
  maxNumberOfPeople,
  registrationDeadline,
  eventStartTime,
  place,
  fee,
  labelNameList,
}) => {
  let actionUrl = "/event/create";
  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("maxNumberOfPeople", maxNumberOfPeople);
  formData.append("registrationDeadline", registrationDeadline);
  formData.append("eventStartTime", eventStartTime);
  formData.append("place", place);
  formData.append("fee", fee);
  if (labelNameList != null && labelNameList.size != 0) {
    formData.append("labelNameList", labelNameList);
  }
  if (dmPicture != null) {
    formData.append("dmPicture", dmPicture);
  }
  return uploadFileRequest(actionUrl, formData);
};

// 查詢 Event(活動) 的 API。
export const findEvent = ({
  keywords,
  pageNumber,
  createTimeA,
  createTimeB,
  startTimeA,
  startTimeB,
  registrationDeadlineA,
  registrationDeadlineB,
  direction,
  sortBy,
}) => {
  let actionUrl = "/event/find";
  let params = {};
  if (keywords != null && keywords != "") {
    params.keywords = keywords;
  }
  if (pageNumber != null) {
    params.pageNumber = pageNumber;
  }
  if (createTimeA != null && createTimeA != "") {
    params.createTimeA = createTimeA;
  }
  if (createTimeB != null && createTimeB != "") {
    params.createTimeB = createTimeB;
  }
  if (startTimeA != null && startTimeA != "") {
    params.startTimeA = startTimeA;
  }
  if (startTimeB != null && startTimeB != "") {
    params.startTimeB = startTimeB;
  }
  if (registrationDeadlineA != null && registrationDeadlineA != "") {
    params.registrationDeadlineA = registrationDeadlineA;
  }
  if (registrationDeadlineB != null && registrationDeadlineB != "") {
    params.registrationDeadlineB = registrationDeadlineB;
  }
  if (direction != null && direction != "") {
    params.direction = direction;
  }
  if (sortBy != null && sortBy != "") {
    params.sortBy = sortBy;
  }
  return postRequest(actionUrl, params);
};

// 搜尋自身發佈 Event(活動) 的 API。
export const searchOwnEvent = ({ pageNumber, sortBy, direction }) => {
  let actionUrl = "/event/my/posted";
  let params = {};
  if (pageNumber != null && pageNumber != "") {
    params.pageNumber = pageNumber;
  }
  if (sortBy != null) {
    params.sortBy = sortBy;
  }
  if (direction != null && direction != "") {
    params.direction = direction;
  }
  return getRequest(actionUrl, params);
};

// 修改自身發佈 Event(活動) 的 API。
export const uploadOwnEvent = ({
  eventId,
  title,
  description,
  maxNumberOfPeople,
  dmPicture,
  registrationDeadline,
  eventStartTime,
  place,
  fee,
  labelNameList,
}) => {
  let actionUrl = "/event/update";
  let formData = new FormData();
  formData.append("eventId", eventId);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("maxNumberOfPeople", maxNumberOfPeople);
  formData.append("registrationDeadline", registrationDeadline);
  formData.append("eventStartTime", eventStartTime);
  formData.append("place", place);
  formData.append("fee", fee);
  if (labelNameList != null && labelNameList.size != 0) {
    formData.append("labelNameList", labelNameList);
  }
  if (dmPicture != null) {
    formData.append("dmPicture", dmPicture);
  }
  return uploadFileRequest(actionUrl, formData);
};

// 刪除自身發佈 Event(活動) 的 API。

export const deleteOwnEvent = ({ eventId }) => {
  let actionUrl = "/event/delete/" + eventId;
  return deleteRequest(actionUrl);
};
