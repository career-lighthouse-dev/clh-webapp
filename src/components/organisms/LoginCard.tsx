import React, { useState, useCallback } from 'react';
import { Button, Card, TextField } from "@material-ui/core";
import { _isLogin, _login } from '../../services/authentication';

const LoginCard = (): JSX.Element => {

    const [identity, setIdentity] = useState<{
        username: string;
        password: string;
    }>({username:'', password:''});

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          setIdentity((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
          }));
        },
        [identity],
    );

    const login = async () => {
        try {
            _login(identity.username, identity.password);
        } catch (error) {
            console.log(error);
        } 
    }

    const checkStatus = async () => {
        try {
            _isLogin()
                .then(response => {
                    console.log('Check whether it is login:',response);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card>
            <TextField
            label="UserName or Email"
            name="username"
            value={identity.username}
            onChange={handleChange}
            variant="filled"
            />

            <TextField
            label="Password"
            name="password"
            value={identity.password}
            onChange={handleChange}
            type="password"
            variant="filled"
            />

            <Button variant="contained" onClick={login}>Login</Button>
            <Button variant="contained" onClick={checkStatus}>Check</Button>

        </Card>
    )
}

export default LoginCard;