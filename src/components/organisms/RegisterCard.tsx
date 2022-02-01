import React, { useState, useCallback } from 'react';
import { Card, TextField, Button, CardActions, CardContent } from "@material-ui/core";
import { _register } from '../../services/authentication';
import { RegisterForm } from '../../models/RegisterForm';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import { useSnackbar, VariantType } from 'notistack';
import { ErrorMessage } from '../../exception/ErrorMessage';
import validate from 'validate.js';
import { FormMessgae } from '../../exception/FormMessage';

const RegisterSchema = {
    username: {
        presence: {
            allowEmpty: false,
            message: FormMessgae.EMPTY
        }
    },
    email: {
        presence: {
            allowEmpty: false,
            message: FormMessgae.EMPTY
        },
        format: {
            pattern: `^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$`,
            message: FormMessgae.FORMAT_INCORRECT
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: FormMessgae.EMPTY
        },
        format: {
            pattern: `^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$`,
            message: FormMessgae.PASSWORD_FORMAT_INCORRECT
        }
    },
    confirmedPassword: {
        presence: {
            allowEmpty: false,
            message: FormMessgae.EMPTY
        },
        equality: {
            attribute: 'password',
            message: FormMessgae.VALUE_DIFFERENT
        },
        format: {
            pattern: `^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$`,
            message: FormMessgae.PASSWORD_FORMAT_INCORRECT
        }
    }
}

const RegisterCard = (): JSX.Element => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    const [registerForm, setForm] = useState<RegisterForm>({
        username: null,
        email: null,
        password: null,
        confirmedPassword: null,
    });

    const [registerErrors, setErrors] = useState<RegisterForm>({
        username: null,
        email: null,
        password: null,
        confirmedPassword: null,
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

        let errors = await validate(registerForm, RegisterSchema);

        if (errors != void 0 && Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
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
                            error={registerErrors.email !== null}
                            helperText={registerErrors.email}
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
                            error={registerErrors.username !== null}
                            helperText={registerErrors.username}
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
                            error={registerErrors.password !== null}
                            helperText={registerErrors.password}
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
                            error={registerErrors.confirmedPassword !== null}
                            helperText={registerErrors.confirmedPassword}
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