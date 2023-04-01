import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@material-ui/core';
import { useStyles } from "./SingleMoviePage.styles";
import axios from "axios";
import { UserAppBar } from "../components/UserAppBar";
import { config } from "../config/apis";

function SingleMoviePage(props) {
  const classes = useStyles();
  const { id } = props.match.params;
  const [movie, setMovie] = useState({ id: "", title: "", year: "", director: "", actors: [] });

  useEffect(() => {
    axios.get(`${config.moviesDetailService}/api/v1.0/films/${id}`).then((response) => {
      setMovie(response.data);
    });
  }, [id]);

  return (
    <>
      <UserAppBar />
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          {movie.title} ({movie.year})
        </Typography>
        <Typography variant="h6" gutterBottom>
          Director: {movie.director}
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="actors table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody hover="true">
              {movie.actors.map((actor) => (
                <TableRow className={classes.tableRow} key={actor.id}>
                  <TableCell component="th" scope="row">
                    {actor.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default SingleMoviePage;