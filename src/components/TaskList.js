import React from 'react';
import Button from '@material-ui/core/Button';
import {data} from '../data/fake_data';
import Paper from '@material-ui/core/Paper';
import TaskItem from './TaskItem';
import TaskModal from './modal/TaskModal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    background: "#DEDFE0",
    width: "400px",
  },
}));

const TaskList = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <div className="task-list">
        <Typography variant="h5" component="h3">
          Task List
        </Typography>
          {data.map((task, index) => {
            return (
              <TaskItem
                key={index}
                task={task}
              />
            )
          })}
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Create Task
          </Button>
      </div>

      <TaskModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
    </Paper>
  );
}

export default TaskList;
