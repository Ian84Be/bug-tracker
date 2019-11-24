import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function TicketCard({ ticket }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    content,
    date_created,
    date_updated,
    from_user_id,
    priority,
    project_id,
    status,
    subject,
  } = ticket;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="project" className={classes.avatar}>
            {project_id}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={project_id}
        subheader={moment(date_created).format('MMMM Do YYYY')}
      />
      <CardContent>
        <Typography variant="caption" color="primary" component="p">
          Status: {status}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          {subject}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          {priority} priority
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
        <Typography variant="overline" color="primary" component="p">
          From: {from_user_id}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Update: {moment(date_updated).format('MMMM Do YYYY')}
          </Typography>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            mmddyyy - so and so tried to fix it - 2 hours no result
          </Typography>
          <Typography paragraph>
            mmddyyy - so and so tried to fix it - 1 hours no result
          </Typography>
          <Typography paragraph>
            mmddyyy - so and so tried to fix it, refactored controller to return
            an object instead of an array - 1 hours FIXED
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
