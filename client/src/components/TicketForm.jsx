import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Paper,
  Icon,
  InputLabel,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    margin: '1rem',
  },
  form: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
    padding: '1rem',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '80%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '80%',
  },
}));

export default function TicketForm() {
  const classes = useStyles();
  const [values, setValues] = useState({
    date_created: moment(),
    date_updated: moment(),
    from_user_id: 1,
    project_id: '',
    priority: 'low',
    subject: '',
    content: '',
  });

  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/projects');
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
      <Typography align="center" variant="h5" style={{ margin: '1rem' }}>
        New Ticket
      </Typography>
      <Paper elevation={3}>
        <form
          noValidate
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Typography variant="overline">
            {moment(values.date).format('MMMM Do YYYY, h:mm:ss a')}
          </Typography>
          <FormControl
            className={classes.formControl}
            variant="filled"
            required
          >
            <InputLabel id="project_id">Project</InputLabel>
            <Select
              autoWidth
              name="project_id"
              labelId="project_id"
              onChange={handleChange}
              value={values.project_id}
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
            className={classes.textField}
            fullWidth
            label="Subject"
            margin="normal"
            name="subject"
            onChange={handleChange}
            required
            value={values.subject}
            variant="filled"
          />

          <TextField
            className={classes.textField}
            fullWidth
            label="Description"
            margin="normal"
            multiline
            name="content"
            onChange={handleChange}
            required
            rows="3"
            value={values.content}
            variant="filled"
          />
          <FormControl
            className={classes.formControl}
            variant="filled"
            required
          >
            <InputLabel id="priority">Priority</InputLabel>
            <Select
              autoWidth
              name="priority"
              labelId="priority"
              onChange={handleChange}
              value={values.priority}
            >
              <MenuItem value="crtical">Critical</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="med">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="nit">Nit</MenuItem>
            </Select>
          </FormControl>
          <Button
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
