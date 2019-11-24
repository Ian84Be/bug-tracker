import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';

import Loading from './Loading';
import TicketCard from './TicketCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: '80%',
    height: 450,
  },
  subHeader: {
    width: '100%',
  },
}));

export default function ViewTickets() {
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/tickets');
        console.log('ViewTickets useEffect() data', data);
        setTickets(data);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(getTickets, 1000);
  }, []);

  return (
    <Container className={classes.root}>
      <ListSubheader className={classes.subHeader} component="div">
        Newest
      </ListSubheader>
      <Grid container spacing={1} justify="center">
        {tickets.length === 0 ? (
          <Loading />
        ) : (
          tickets.map(ticket => {
            return (
              <Grid item key={ticket.id}>
                <TicketCard ticket={ticket} />
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
}
