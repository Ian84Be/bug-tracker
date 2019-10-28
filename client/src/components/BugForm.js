import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Icon,
  InputLabel,
  Select,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  form: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export default function BugForm() {
  const classes = useStyles();
  const [values, setValues] = useState({
    subj: '',
    timestamp: Date.now(),
    from: 'thisUsername',
    desc: '',
    project: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log({ values });
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/bugs',
        values
      );
      console.log(data);
      setValues({
        subj: '',
        timestamp: Date.now(),
        from: 'thisUsername',
        desc: '',
        project: ''
      });
    } catch (err) {
      console.error('BugForm.js handleSubmit()', err);
    }
  };
  return (
    <Container maxWidth="sm">
      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <p style={{ margin: '0' }}>
          {moment(values.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
        </p>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="project-label-placeholder">
            Project
          </InputLabel>
          <Select
            value={values.project}
            onChange={handleChange}
            inputProps={{
              name: 'project',
              id: 'project-label-placeholder'
            }}
            displayEmpty
            name="project"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'This'}>This</MenuItem>
            <MenuItem value={'That'}>That</MenuItem>
            <MenuItem value={'The Other'}>The Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Subject"
          className={classes.textField}
          value={values.subj}
          onChange={handleChange}
          margin="normal"
          name="subj"
        />

        <TextField
          className={classes.textField}
          label="Description"
          margin="normal"
          name="desc"
          multiline
          onChange={handleChange}
          value={values.desc}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Icon>send</Icon>}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
