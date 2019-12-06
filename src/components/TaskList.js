import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskModal from './modal/TaskModal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TaskService from '../models/tasks'

import {
  getTasks,
  deleteTask
} from '../api/tasks.api.js';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 2),
    background: "#DEDFE0",
    width: "400px",
  },
}));

const TaskList = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = (task) => {
    //setTasks([...tasks, task]);
    handleClose();
  }

  const handleDelete = (id) => {
    deleteTask(id)

    //simultaneious you want to remove a task by its id.
  }

  useEffect(() => {
    TaskService.subscribe(setTasks);

    let result = getTasks()

    setTasks(result)

    return () => TaskService.unsubscribe(setTasks);
  }, []);

  return (
    <Paper className={classes.root}>
      <div className="task-list">
        <Typography variant="h5" component="h3">
          Task List
        </Typography>
          {tasks.map((task, index) => {
            return (
              <TaskItem
                key={index}
                task={task}
                handleDelete={handleDelete}
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
      >
        <TaskForm
          handleCreate={handleCreate}
        />
      </TaskModal>
    </Paper>
  );
}

export default TaskList;
