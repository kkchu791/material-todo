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
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 2),
    background: "#EAD2AC",
  },
  taskListHeader: {
    position: "relative",
  },
  formControl: {
    position: 'absolute',
    right: '5px',
    bottom: '0',
    width: '124px',
  },
}));

const TaskList = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState({})
  const [sort, setSort] = useState("none")

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNew = () => {
    setOpen(true)
    setCurrentTask({})
  }

  const handleCreate = (task) => {
    TaskService.create(task)
    handleClose();
  }

  const handleEdit = (id) => {
    setOpen(true)
    setCurrentTask(TaskService.get(id))
  }

  const handleUpdate = (task) => {
    TaskService.update(task)
    handleClose();
  }

  const handleDelete = (id) => {
    TaskService.delete(id)
  }

  const handleSortChange = (event) => {
    event.preventDefault();
    const sortValue = event.target.value;

    setSort(sortValue);
  }

  const sortTasks = () => {
    if (sort === "none") return tasks;
    let sortedTasks;
    let order = sort === "high_priority" ? "desc" : "asc" ;
    return _.orderBy(tasks, ["priority"], [order]);
  }

  useEffect(() => {
    TaskPubSub.subscribe(setTasks);

    setTasks(TaskService.getAll());

    return () => TaskPubSub.unsubscribe(setTasks);
  }, []);

  return (
    <Paper className={classes.root}>
      <div className="task-list">
        <div className={classes.taskListHeader}>
          <Typography variant="h6" className={classes.taskListName}>
            Task List
          </Typography>

          <FormControl className={classes.formControl}>
            <InputLabel id="sort">Sorting by:</InputLabel>
            <Select
              id="sort"
              value={sort || ""}
              onChange={handleSortChange}
            >
              <MenuItem value="none"><em>None</em></MenuItem>
              <MenuItem value="high_priority">High Priority</MenuItem>
              <MenuItem value="low_priority">Low Priority</MenuItem>
            </Select>
          </FormControl>
        </div>

        {sortTasks().map((task, index) => {
          return (
            <TaskItem
              key={index}
              task={task}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )
        })}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNew}
        >
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
