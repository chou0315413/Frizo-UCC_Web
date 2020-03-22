import axios from 'axios'

let baseUrl = 'http://localhost:8080'; // 這裡設定網站的 base-url

function getAuthToken (){
    let token = (localStorage.getItem('authToken'));
    return token
}

export const postRequest = (url, params) => {
    const userRequest = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthToken(),
        },
    });
    return userRequest.post(url, params)
}

export const uploadFileRequest = (url, params) => {
    const userRequest = axios.create({
        baseURL: baseUrl,
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return userRequest.post(url, params)
}

export const putRequest = (url, params) => {
    const userRequest = axios.create({
        baseURL: baseUrl,
        headers: { 'Content-Type': 'application/json' },
    });
    return userRequest.put(url, params)
}

export const deleteRequest = (url) => {
    const userRequest = axios.create({
        baseURL: baseUrl,
    });
    return userRequest.delete(url)
}

export const getRequest = (url, params) => {
    const userRequest = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthToken(),
        },
    });
    return userRequest.get(url, params)
}