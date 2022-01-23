import { get, post, put } from './uacAxios';

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