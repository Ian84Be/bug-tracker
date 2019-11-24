import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 375,
    margin: '1rem',
  },
}));

export default function TicketCard({ ticket }) {
  const classes = useStyles();

  const {
    content,
    date_created,
    date_updated,
    from_user,
    priority,
    project,
    status,
    subject,
  } = ticket;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="overline" color="textPrimary" component="p">
          {project}
        </Typography>
        <Typography variant="caption" color="textPrimary" component="p">
          {moment(date_created).fromNow()}
        </Typography>
        <Typography paragraph variant="caption" color="primary" component="p">
          {status}
        </Typography>
        <Typography variant="h6" color="textPrimary" component="p">
          {subject}
        </Typography>
        {priority && (
          <Typography paragraph variant="caption" color="primary" component="p">
            {priority} priority
          </Typography>
        )}
        <Typography
          color="textSecondary"
          component="p"
          paragraph
          variant="body2"
        >
          {content}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Submitted by: {from_user}
        </Typography>
      </CardContent>
    </Card>
  );
}
