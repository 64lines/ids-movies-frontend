import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import MenuIcon from '@material-ui/icons/Menu';
import { Toolbar, Typography, IconButton, Button, Avatar, AppBar, Menu, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStyles } from './UserAppBar.style';

export function UserAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoviesClick = () => {
    history.push('/');
    handleClose();
  };

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (!username) {
      return;
    }

    setAuthenticated(true);
    setUsername(username);
  }, [setAuthenticated])

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon onClick={handleClick} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleMoviesClick}>Movies</MenuItem>
        </Menu>
        <Typography variant="h6" className={classes.title}>
          Movies
        </Typography>

        {isAuthenticated ? (
          <>
            <Avatar style={{ backgroundColor: 'orange' }} alt={username.toUpperCase()} src="/path/to/avatar.jpg" className={classes.avatar} />
            <Typography variant="body1" className={classes.username}>{username}</Typography>
            <Button color="inherit" variant='outlined' onClick={() => {
              setAuthenticated(false);
              sessionStorage.clear();
              history.push("/")
            }}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => {
              history.push("/register") 
            }}>Register</Button>
            <Button color="inherit" onClick={() => {
              history.push("/login")
            }}>Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>)
}