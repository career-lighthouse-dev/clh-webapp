import React, { useState } from 'react';
import { Card, TextField, Button } from "@material-ui/core";
import { _register } from '../../services/authentication';
import { RegisterForm } from '../../models/RegisterForm';

const RegisterCard = (): JSX.Element => {

    const [registerForm, setForm] = useState<RegisterForm>({
        username: '',

        email: '',

        password: '',

        confirmedPassword: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const register = async () => {
        try {
        _register(registerForm);
        } catch(e) {
            //throw
        }
    }

    return (
        <Card>
            <TextField
            required
            name='email'
            label='Email'
            onChange={handleChange}
            value={registerForm.email}
            />

            <TextField
            required
            name='username'
            label='User Name'
            onChange={handleChange}
            value={registerForm.username}
            />

            <TextField
            required
            name='password'
            label='Password'
            onChange={handleChange}
            value={registerForm.password}
            />

            <TextField
            required
            name='confirmedPassword'
            label='Confirmed Password'
            onChange={handleChange}
            value={registerForm.confirmedPassword}
            />

            <Button variant="contained" onClick={register}>Register</Button>
        </Card>
    )
}

export default RegisterCard;