import React from 'react';
import Navbar from './components/Navbar';
import { Button, CssBaseline } from '@material-ui/core';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </>
  );
}

export default App;
