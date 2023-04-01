import React from 'react';
import MoviesTable from '../components/MoviesTable';
import { UserAppBar } from '../components/UserAppBar';
import { useStyles } from './MoviesPage.styles';
import { Typography, Box } from '@material-ui/core';

function MoviesPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <UserAppBar />
      <MoviesTable />
      <Box py={2} bgcolor="grey.200">
        <Typography variant="body2" align="center" color="textSecondary">
          Copyright © Julian Alexander Murillo Portocarrero EAFIT
        </Typography>
      </Box>
    </div>
  );
}

export default MoviesPage;
