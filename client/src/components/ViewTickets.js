import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Loading from './Loading';
import Grid from '@material-ui/core/Grid';
import TicketCard from './TicketCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
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
    <div className={classes.root}>
      <Grid container spacing={3}>
        {tickets.length === 0 ? (
          <Loading />
        ) : (
          tickets.map(t => {
            return (
              <Grid item xs key={t.id}>
                <TicketCard {...t} />
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}
