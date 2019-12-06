import React from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    margin: "8px 0",
    display: "flex",
    alignItems: "center",
  },
  deleteButton: {
    
  },
  cardContent: {
    padding: "4px 10px",
  }
});


const TaskItem = ({
  task,
  index,
  handleDelete,
  handleEdit,
}) => {
  const classes = useStyles();
  return (
    <Card key={index} className={classes.card}>
      <div className={classes.cardContent}>
        {task.description}

        <IconButton
          className={classes.deleteButton}
          aria-label="delete"
          onClick={() => handleDelete(task.id)}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          className={classes.editButton}
          aria-label="edit"
          onClick={() => handleEdit(task.id)}
        >
          <EditIcon />
        </IconButton>
      </div>
    </Card>
  );
}

export default TaskItem;
