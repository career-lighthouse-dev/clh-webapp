import { get, post, put } from './uacAxios';
import { RegisterForm } from '../models/RegisterForm';

export const _login = (username: string, password: string) => {
    console.log("Login input: username - " + username + ", password - " + password);
    return post<any>(`/uac/login`, {
        username: username,
        password: password
    }).then((res: any) => {
        if (res != void 0) {
            localStorage.setItem('token', JSON.stringify(res));
            return true;
        } else {
            return false;
        }
    });
}

export const _isLogin = () => {
    return post<any>(`/uac/isLogin`);
}

export const _register = (form: RegisterForm) => {
    return post<any>(`/user/register`, form);
}