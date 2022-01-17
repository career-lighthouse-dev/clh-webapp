import { get, post, put } from './uacAxios';

export const _login = (username: string, password: string) => {
    console.log("Login input: username - " + username + ", password - " + password);
    return post<Response>(`/uac/login`, {
        username:username,
        password:password
    });
}

export const _isLogin = () => {
    return get<Response>(`/uac/isLogin`);
}