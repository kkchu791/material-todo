import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

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

  const handleSubmit = (event) => {
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
        <FormControl
          variant="outlined"
          className={classes.formControl}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={task.description || ''}
            onChange={handleInputChange}
            required={true}
          />

        </FormControl>

        <FormControl
          required
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel
            variant="outlined"
            htmlFor="priority-required"
          >
            Priority
          </InputLabel>

          <Select
            native
            variant="outlined"
            name="priority"
            id="priority-selector"
            value={task.priority || 0}
            onChange={handleInputChange}
            required
            inputProps={{
              id: 'priority-required',
            }}
          >
            <option></option>
            <option value={1}>low</option>
            <option value={2}>medium</option>
          <option value={3}>high</option>
          </Select>
          <FormHelperText>Required</FormHelperText>
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
