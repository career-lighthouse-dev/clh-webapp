
import axios from 'axios';

const service = axios.create({
    baseURL: process.env.URL,
    timeout: 10000,
});


service.interceptors.response.use(
    (response) => {
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