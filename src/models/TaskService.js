import PubSub from './PubSub'

const generateId = () => {
  const randomId = Math.random().toString(36).substring(6);

  if (sessionStorage.getItem(randomId)) {
    return generateId();
  } else {
    return randomId;
  }
}

const getTaskIds = () => {
  return JSON.parse(sessionStorage.getItem("taskIds")) || []
}

const storeTask = (id, task) => {
  task = JSON.stringify(task);
  sessionStorage.setItem(id, task);
}

const removeTask = (id) => {
  sessionStorage.removeItem(id)
}

const storeTaskId = (id) => {
  let newTaskIds = getTaskIds().concat(id)
  storeTaskIds(newTaskIds)
}

const removeTaskId = (id) => {
  let filteredTaskIds = getTaskIds().filter(taskId => taskId !== id)
  storeTaskIds(filteredTaskIds)
}

const storeTaskIds = (ids) => {
  sessionStorage.setItem("taskIds", JSON.stringify(ids))
}

class TaskService {
  static get(id) {
    return JSON.parse(sessionStorage.getItem(id))
  }

  static getAll() {
    let taskIds = getTaskIds()
    return taskIds.map(this.get)
  }

  static create(taskProperties) {
    const id = generateId();
    const task = {...taskProperties, ...{id: id}}
    storeTask(id, task)
    storeTaskId(id)

    PubSub.publishChange(this.getAll());
  }

  static update(task) {
    storeTask(task.id, task);

    PubSub.publishChange(this.getAll());
  }

  static delete(taskId) {
    removeTask(taskId)
    removeTaskId(taskId)

    PubSub.publishChange(this.getAll());
  }
}

export default TaskService;
