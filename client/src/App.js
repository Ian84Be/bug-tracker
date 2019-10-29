import React, { useState } from 'react';
import PrimaryAppBar from './components/PrimaryAppBar';
import { CssBaseline } from '@material-ui/core';
import TicketForm from './components/TicketForm';
import ViewTickets from './components/ViewTickets';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import { red, grey } from '@material-ui/core/colors';

import { BrowserRouter, Route, Link } from 'react-router-dom';

const useStyles = makeStyles({
  link: {
    color: grey[900],
    textDecoration: 'none'
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  iconHover: {
    '&:hover': {
      color: red[800]
    }
  }
});

function App() {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setMenuOpen(open);
  };

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link to="/new-ticket" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Icon className={classes.iconHover}>note_add</Icon>
            </ListItemIcon>
            <ListItemText primary="Create New Ticket" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/all-tickets" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Icon>public</Icon>
            </ListItemIcon>
            <ListItemText primary="View All Tickets" />
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon>
            <Icon>find_in_page</Icon>
          </ListItemIcon>
          <ListItemText primary="My Tickets" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon>person_outline</Icon>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <BrowserRouter>
      <CssBaseline />
      <Drawer anchor="top" open={menuOpen} onClose={toggleDrawer('top', false)}>
        {fullList('top')}
      </Drawer>
      <PrimaryAppBar onMenuClick={toggleDrawer} />
      <Route path="/new-ticket" component={TicketForm} />
      <Route path="/all-tickets" component={ViewTickets} />
    </BrowserRouter>
  );
}

export default App;
