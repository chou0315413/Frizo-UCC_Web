import axios from 'axios'
import {getAuthorization} from './AuthStore'

let baseUrl = 'http://localhost:8080'; // 這裡設定網站的 base-url

export const postRequest = (url, params) => {
    const userRequest = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthorization(),
        },
    });
    return userRequest.post(url, params)
};

export const uploadFileRequest = (url, params) => {
    const userRequest = axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': getAuthorization()
        },
        mimeType: 'multipart/form-data'
    });
    return userRequest.post(url, params)
};

export const putRequest = (url, params) => {
    const userRequest = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthorization()
        },
    });
    return userRequest.put(url, params)
};

export const deleteRequest = (url) => {
    const userRequest = axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': getAuthorization()
        },
    });
    return userRequest.delete(url)
};

export const getRequest = (url, data) => {
    let params = {
        params: data
    };
    const userRequest = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthorization(),
        },
    });
    return userRequest.get(url, params)
};