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

const TaskForm = () => {
  const classes = useStyles();
  const [data, setData] = useState({})

  const handleInputChange = evt => {
    var value = evt.target.value
    var name = evt.target.name
    setData({...data, ...{[name]: value}})
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(data, 'data')

    // you have to get the list
    // push your data into your list
    // and then set it as the value

    debugger

    let taskList = sessionStorage.getItem('myData')

    let newTaskList = (taskList || []).concat(data)



    sessionStorage.setItem('data', newTaskList)
  }

  console.log(data, "data")

  return (
    <form onSubmit={handleSubmit}>
      <FormControl variant="outlined" className={classes.formControl}>
        <label>
          Task Name
        </label>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="task_name"
          label="Task Name"
          name="task_name"
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
          value={data["priority"] || "low"}
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
  );
}

export default TaskForm;
