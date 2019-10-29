import React from 'react';
import PrimaryAppBar from './components/PrimaryAppBar';
import { CssBaseline } from '@material-ui/core';
import TicketForm from './components/TicketForm';
import ViewTickets from './components/ViewTickets';

function App() {
  return (
    <>
      <CssBaseline />
      <PrimaryAppBar />
      <ViewTickets />
      <TicketForm />
    </>
  );
}

export default App;
