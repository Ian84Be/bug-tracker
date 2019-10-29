import React from 'react';
import PrimaryAppBar from './components/PrimaryAppBar';
import { CssBaseline } from '@material-ui/core';
import TicketForm from './components/TicketForm';

function App() {
  return (
    <>
      <CssBaseline />
      <PrimaryAppBar />
      <TicketForm />
    </>
  );
}

export default App;
