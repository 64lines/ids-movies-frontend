import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import axios from "axios";
import { useStyles } from './MoviesTable.style';
import { useHistory } from 'react-router-dom';
import { config } from '../config/apis';

export default function MoviesTable() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get(`${config.moviesService}/api/v1.0/films`).then((response) => {
      const movies = response.data;
      setMovies(movies);
      sessionStorage.setItem('movies', JSON.stringify(movies))
    }).catch(() => {
      const movies = sessionStorage.getItem('movies')

      if (!movies) {
        return;
      }

      const parsedMovies = JSON.parse(movies);
      setMovies(parsedMovies);
    });
  }, []);
  
  return (<TableContainer component={Paper}>
    <Table className={classes.table} aria-label="Movies table">
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell align="right">Director</TableCell>
          <TableCell align="right">Year</TableCell>
        </TableRow>
      </TableHead>
      <TableBody hover="true">
        {movies.map((movie) => (
          <TableRow key={movie.title} className={classes.tableRow} onClick={() => {
            history.push(`/movies/${movie.id}`)
          }}>
            <TableCell component="th" scope="row">
              {movie.title}
            </TableCell>
            <TableCell align="right">{movie.director}</TableCell>
            <TableCell align="right">{movie.year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>)
}