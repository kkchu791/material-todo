import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
  formControl: {
    width: "100%",
    padding: '15px 0',
 },
});

const TaskForm = ({
  handleCreate,
  handleUpdate,
  currentTask,
}) => {
  const classes = useStyles();
  const [task, setTask] = useState(currentTask)

  const handleInputChange = evt => {
    var value = evt.target.value
    var name = evt.target.name
    setTask({...task, ...{[name]: value}})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (task.id) {
      handleUpdate(task)
    } else {
      handleCreate(task)
    }
  }

  return (
    <div>
      <h2 id="form-title">Task Form</h2>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined" className={classes.formControl}>
          <label>
            Description
          </label>

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={task.description || ''}
            onChange={handleInputChange}
          />

        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <label id="priority-label">
            Priority
          </label>

          <Select
            labelId="priority-label"
            name="priority"
            id="priority-selector"
            value={task.priority || ""}
            onChange={handleInputChange}
          >
            <MenuItem value="low">low</MenuItem>
            <MenuItem value="medium">medium</MenuItem>
            <MenuItem value="hard">hard</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
            Save Task
        </Button>
      </form>
    </div>
  );
}

export default TaskForm;
