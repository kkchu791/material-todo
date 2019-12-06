import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskModal from './modal/TaskModal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PubSub from '../models/PubSub';
import TaskService from '../models/TaskService';
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
  const [tasks, setTasks] = useState(TaskService.getAll())
  const [currentTask, setCurrentTask] = useState({})
  const [sort, setSort] = useState("none")

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleNew = () => {
    openModal();
    setCurrentTask({});
  }

  const handleCreate = (task) => {
    TaskService.create(task);
    closeModal();
  }

  const handleEdit = (task) => {
    openModal();
    setCurrentTask(task);
  }

  const handleUpdate = (task) => {
    TaskService.update(task);
    closeModal();
  }

  const handleDelete = (id) => {
    TaskService.delete(id)
  }

  const handleSortChange = (event) => {
    event.preventDefault();
    const sortValue = event.target.value;

    setSort(sortValue);
  }

  const sortedTasks = () => {
    if (sort === "none") return tasks;
    let order = sort === "high_priority" ? "desc" : "asc" ;
    return _.orderBy(tasks, ["priority"], [order]);
  }

  useEffect(() => {
    PubSub.subscribe(setTasks);
    return () => PubSub.unsubscribe(setTasks);
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

        {sortedTasks().map((task, index) => {
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
        closeModal={closeModal}
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
