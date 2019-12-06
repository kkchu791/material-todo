import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskModal from './modal/TaskModal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TaskPubSub from '../models/task_pub_sub';
import TaskService from '../models/tasks';

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
  const [currentTask, setCurrentTask] = useState({})

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = (task) => {
    TaskService.create(task)
    handleClose();
  }

  const handleDelete = (id) => {
    TaskService.delete(id)
  }

  const handleEdit = (id) => {
    setOpen(true)
    setCurrentTask(TaskService.get(id))
  }

  const handleUpdate = (task) => {
    TaskService.update(task)
    handleClose();
  }

  useEffect(() => {
    TaskPubSub.subscribe(setTasks);

    setTasks(TaskService.getAll());

    return () => TaskPubSub.unsubscribe(setTasks);
  }, []);

  console.log(currentTask, 'CurrentTask')

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
                handleEdit={handleEdit}
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
          handleUpdate={handleUpdate}
          currentTask={currentTask}
        />
      </TaskModal>
    </Paper>
  );
}

export default TaskList;
