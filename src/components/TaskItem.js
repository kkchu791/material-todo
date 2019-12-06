import React from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { PRIORITIES } from '../utils/priority_helper';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles({
  card: {
    margin: "8px 0",
    display: "flex",
    alignItems: "center",
    background: "#9CAFB7",
  },
  cardContent: {
    padding: "4px 10px",
  },
  cardActions: {
    marginLeft: "auto",
  },
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
        <Typography>
          {task.description} 
        </Typography>
        <Typography  color="textSecondary" variant="body2" component="p">
          {`priority: ${PRIORITIES[task.priority]}`}
        </Typography>
      </div>
      <CardActions className={classes.cardActions}>
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
      </CardActions>
    </Card>
  );
}

export default TaskItem;
