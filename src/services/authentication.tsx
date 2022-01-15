import { get, post, put } from './uacAxios';

export const _login = (username: string, password: string,) => {
    return post<Response>(`/auth/login`, {
        username:username,
        password:password
    });
}