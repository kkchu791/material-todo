import TaskService from '../models/tasks'

const createTask = (task) => {
  return TaskService.create(task);
}

const getTasks = () => {
  return TaskService.getAll();
}

const deleteTask = (id) => {
  return TaskService.delete(id)
}


export {
  createTask,
  getTasks,
  deleteTask
}
