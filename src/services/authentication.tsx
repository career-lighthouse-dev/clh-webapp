import { get, post, put } from './uacAxios';
import { RegisterForm } from '../models/RegisterForm';
import { LoginForm } from '../models/LoginForm';

export const _login = (identity:LoginForm) => {
    return post<any>(`/uac/login`, {
        username: identity.username,
        password: identity.password
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