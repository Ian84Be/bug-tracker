import React, { useState, useEffect } from 'react';
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
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  form: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function TicketForm() {
  const classes = useStyles();
  const [values, setValues] = useState({
    date_created: moment(),
    date_updated: moment(),
    from_user_id: 1,
    project_id: '',
    priority: null,
    subject: '',
    content: '',
  });

  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/projects');
        console.log(data);
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (!projects) fetchProjects();
    else return;
  }, [projects]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log({ values });
    try {
      const data = await axios.post(
        'http://localhost:5000/api/tickets',
        values
      );
      console.log(data);
      setValues({
        date_created: moment(),
        date_updated: moment(),
        from_user_id: 1,
        project_id: '',
        priority: null,
        subject: '',
        content: '',
      });
    } catch (err) {
      console.error('TicketForm.js handleSubmit()', err);
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
          {moment(values.date).format('MMMM Do YYYY, h:mm:ss a')}
        </p>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="project-label-placeholder">
            Project
          </InputLabel>
          <Select
            value={values.project_id}
            onChange={handleChange}
            inputProps={{
              name: 'project_id',
              id: 'project-label-placeholder',
            }}
            name="project_id"
            className={classes.selectEmpty}
          >
            {projects &&
              projects.map(proj => {
                return (
                  <MenuItem key={proj.id} value={proj.id}>
                    {proj.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <TextField
          label="Subject"
          className={classes.textField}
          value={values.subject}
          onChange={handleChange}
          margin="normal"
          name="subject"
        />

        <TextField
          className={classes.textField}
          label="Description"
          margin="normal"
          name="content"
          multiline
          onChange={handleChange}
          value={values.content}
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
