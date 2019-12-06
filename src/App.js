import React from 'react';
import TaskList from './components/TaskList';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    height: "100vh",
    overflowY: "auto",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Container className={`${classes.root} App`}>
      <TaskList />
    </Container>
  );
}

export default App;
