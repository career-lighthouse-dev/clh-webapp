import React, { useState, useCallback } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Card, CardActions, CardContent, TextField } from "@material-ui/core";
import { _isLogin, _login } from '../../services/authentication';
import { useSnackbar,VariantType } from 'notistack';
import {useRouter} from 'next/router';
import { ErrorMessage } from '../../exception/ErrorMessage';
import { LoginForm } from '../../models/LoginForm';
import validate from 'validate.js';
import { FormMessgae } from '../../exception/FormMessage';

const LoginSchema = {
    username: {
        presence: {
            allowEmpty: false,
            message: FormMessgae.EMPTY
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: FormMessgae.EMPTY
        }
    }
}

const LoginCard = (): JSX.Element => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    const [identity, setIdentity] = useState<LoginForm>({ username: null, password: null});

    const [loginErrors, setErrors] = useState<LoginForm>({ username: null, password: null});

    /**
     * Change form states
     */
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setIdentity((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
            }));
        },
        [identity],
    );


    const addNotification = useCallback(
        (variant: VariantType, message: string) => {
        enqueueSnackbar(message, { variant });
        },
        [enqueueSnackbar],
    );

    /**
     * Login
     */
    const login = async () => {
        setLoading(true);

        let errors = await validate(identity, LoginSchema);

        if (errors != void 0 && Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            _login(identity)
            .then((result:boolean) => {
                if (result) {
                    //Redirect
                    router.push(`/board`);
                } else {
                    //Print error
                    addNotification('error', ErrorMessage.FAILED_LOGIN);
                }
            })
            .catch(error => {
                console.log(error);
                addNotification('error', ErrorMessage.WENT_WRONG);
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
                        label="UserName or Email"
                        name="username"
                        value={identity.username}
                        onChange={handleChange}
                        variant='filled'
                        fullWidth
                        style={{ marginBottom: 20 }}
                    />
                </div>
                <div>
                    <TextField
                        label="Password"
                        name="password"
                        value={identity.password}
                        onChange={handleChange}
                        type="password"
                        variant="filled"
                        fullWidth
                        style={{ marginBottom: 20 }}
                    />
                </div>
            </CardContent>
            <CardActions>
                <LoadingButton loading={loading} variant="contained" color='primary' onClick={login}>Login</LoadingButton>
                {/* <Button variant="contained" onClick={checkStatus}>Check</Button> */}
            </CardActions>
        </Card>
        </div>
    )
}

export default LoginCard;