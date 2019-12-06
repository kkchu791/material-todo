import TaskPubSub from './task_pub_sub'

const generateId = () => {
  return Math.random().toString(36).substring(6);
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
  sessionStorage.setItem("taskIds", JSON.stringify(newTaskIds))
}

const removeTaskId = (id) => {
  let newTaskIds = getTaskIds().filter(taskId => taskId !== id)
  sessionStorage.setItem("taskIds", JSON.stringify(newTaskIds))
}

class TaskService {
  static get(id) {
    return JSON.parse(sessionStorage.getItem(id))
  }

  static getAll() {
    let taskIds = JSON.parse(sessionStorage.getItem('taskIds')) || []
    return taskIds.map(id => this.get(id))
  }

  static create(taskProperties) {
    const id = generateId();
    const task = {...taskProperties, ...{id: id}}
    storeTask(id, task)
    storeTaskId(id)

    TaskPubSub.publishChange();
  }

  static update(task) {
    storeTask(task.id, task);

    TaskPubSub.publishChange();
  }

  static delete(taskId) {
    removeTask(taskId)
    removeTaskId(taskId)

    TaskPubSub.publishChange();
  }

}

export default TaskService;
