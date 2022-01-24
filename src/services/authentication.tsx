import { get, post, put } from './uacAxios';
import {RegisterForm} from '../models/RegisterForm';

export const _login = (username: string, password: string) => {
    console.log("Login input: username - " + username + ", password - " + password);
    post<Response>(`/uac/login`, {
        username:username,
        password:password
    }).then((res:any) => {
        if (res != void 0) {
            localStorage.setItem('token', JSON.stringify(res));
        } else {
            //Throw exception
        }
    });
}

export const _isLogin = () => {
    return post<Response>(`/uac/isLogin`);
}

export const _register = (form:RegisterForm) => {
    return post<Response>(`/uac/register`, form);
}