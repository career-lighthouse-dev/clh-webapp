import React, { useState, useCallback } from 'react';
import { Card, TextField, Button, CardActions, CardContent } from "@material-ui/core";
import { _register } from '../../services/authentication';
import { RegisterForm } from '../../models/RegisterForm';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useSnackbar, VariantType } from 'notistack';
import { ErrorMessage } from '../../exception/ErrorMessage';

const RegisterCard = (): JSX.Element => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

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

    const addNotification = useCallback(
        (variant: VariantType, message: string) => {
          enqueueSnackbar(message, { variant });
        },
        [enqueueSnackbar],
      );

    /**
     * Register
     */
    const register = async () => {
        setLoading(true)
        _register(registerForm)
        .then(response => {
            if (response) {
                router.push(`/auth/login`);
            } else {
                addNotification('error', ErrorMessage.FAILED_REGISTER);
            }
        })
        .catch(error => {
            console.log(error);
            addNotification('error', error);
        })
        .finally(() => setLoading(false));
    }

    return (
        <div>
            <Card style={{ minWidth: 400, maxWidth: 500, padding: 30 }}>
                <CardContent>
                    <div>
                        <TextField
                            label='Email'
                            name='email'
                            value={registerForm.email}
                            onChange={handleChange}
                            variant='filled'
                            fullWidth
                            style={{marginBottom: 20}}
                        />
                    </div>
                    <div>
                        <TextField
                            label='User Name'
                            name='username'
                            value={registerForm.username}
                            onChange={handleChange}
                            variant='filled'
                            fullWidth
                            style={{marginBottom: 20}}
                        />
                    </div>
                    <div>
                        <TextField
                            label='Password'
                            name='password'
                            value={registerForm.password}
                            onChange={handleChange}
                            variant='filled'
                            fullWidth
                            style={{marginBottom: 20}}
                        />
                    </div>
                    <div>
                        <TextField
                            label='Confirmed Password'
                            name='confirmedPassword'
                            value={registerForm.confirmedPassword}
                            onChange={handleChange}
                            variant='filled'
                            fullWidth
                            style={{marginBottom: 20}}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <LoadingButton loading={loading} variant="contained" color='primary' onClick={register}>Register</LoadingButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default RegisterCard;