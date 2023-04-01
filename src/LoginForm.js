import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch"
        }
    },
    button: {
        margin: theme.spacing(1)
    }
}));

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    
    const handleSnackbarClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/login", {
                username,
                password
            });
            setError(false);
            console.log(response.data);
        } catch (error) {
            setOpen(true);
            setError(true);
        }
    };
    return (
        <>
            <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    required
                    id="username"
                    label="Username"
                    value={username}
                    error={error}
                    onChange={handleUsernameChange}
                />
                <TextField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    error={error}
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Login
                </Button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    Username or password invalid
                </Alert>
            </Snackbar>
        </>
    );
};

export default LoginForm;
