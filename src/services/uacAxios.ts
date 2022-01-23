
import axios from 'axios';
import { TokenInfo } from '../models/TokenInfo';

const service = axios.create({
    baseURL: process.env.HOST,
    timeout: 10000,
});

// Add a request interceptor
service.interceptors.request.use(function (config: any) {
    let token = localStorage.getItem('token');
    if (token != void 0) {
        let tokenInfo:TokenInfo = JSON.parse(token);
        config.headers.satoken =  tokenInfo.tokenValue;
    }
    return config;
});

service.interceptors.response.use(
    (response) => {
        console.log("Response of API call: ", response);
        if (response.status === 200) {
            return response.data;
        }

        return response;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

export const { get, post, put, delete: del } = service;