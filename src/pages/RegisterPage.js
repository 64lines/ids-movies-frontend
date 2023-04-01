import React, { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Snackbar, Grid, Paper } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import AuthContextProvider, { AuthContext } from "../context/AuthContextProvider";
import { useHistory } from 'react-router-dom';
import { UserAppBar } from "../components/UserAppBar";
import { config } from "../config/apis";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RegisterPage(props) {
  // eslint-disable-next-line no-unused-vars
  const { _, setAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    axios
      .post(`${config.authService}/api/register`, { username, password })
      .then(() => {
        setAlertType("success");
        setAlertMessage("Registration successful!");
        setAuthenticated(true);
        setOpen(true);

        sessionStorage.setItem("username", username);
        history.push("/")
      })
      .catch(() => {
        setAlertType("error");
        setAlertMessage("Registration failed. Please try again.");
        setOpen(true);
      });
  };


  return (
    <AuthContextProvider>
      <UserAppBar/>
      <div className={classes.root}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={handleRegistration}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleRegistration}
                className={classes.submit}
              >
                Register
              </Button>
            </form>
          </Paper>
        </Grid>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert severity={alertType}>{alertMessage}</Alert>
        </Snackbar>
      </div>
    </AuthContextProvider>
  )
}

export default RegisterPage