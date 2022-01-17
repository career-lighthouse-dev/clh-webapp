
import axios from 'axios';

const service = axios.create({
    baseURL: process.env.HOST,
    timeout: 10000,
});


service.interceptors.response.use(
    (response) => {
        console.log("Response of API call: ", response);
        if (response.status === 500) {
            // Todo
        }

        return response;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

export const { get, post, put, delete: del } = service;