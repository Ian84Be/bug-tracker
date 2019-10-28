import React from 'react';
import PrimaryAppBar from './components/PrimaryAppBar';
import { CssBaseline } from '@material-ui/core';
import BugForm from './components/BugForm';

function App() {
  return (
    <>
      <CssBaseline />
      <PrimaryAppBar />
      <BugForm />
    </>
  );
}

export default App;
