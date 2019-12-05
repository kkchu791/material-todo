import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    margin: "8px 0",
  },
});



const TaskItem = ({
  task,
  index
}) => {
  const classes = useStyles();
  return (
    <Card key={index} className={classes.card}>
      <CardContent>
        {task.description}
      </CardContent>
    </Card>
  );
}

export default TaskItem;
