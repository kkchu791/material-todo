import TaskService from '../models/tasks'

const createTask = (taskProperties) => {
  return TaskService.create(taskProperties);
}

const getTasks = () => {
  return TaskService.getAll();
}


export {
  createTask,
  getTasks
}
