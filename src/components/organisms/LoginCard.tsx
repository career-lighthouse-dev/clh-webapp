import React, { useState, useCallback } from 'react';
import { Button, Card, TextField } from "@material-ui/core";

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
        [],
    );

    return (
        <Card>
            <TextField
            label="UserName or Email"
            value={identity.username}
            onChange={handleChange}
            variant="filled"
            />

            <TextField
            label="Password"
            value={identity.password}
            onChange={handleChange}
            type="password"
            variant="filled"
            />

            <Button variant="contained">Login</Button>

        </Card>
    )
}

export default LoginCard;