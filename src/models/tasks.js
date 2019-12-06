import _ from 'lodash';

const generateId = () => {
  return Math.random().toString(36).substring(6);
}

const storeTask = (id, task) => {
  const json = JSON.stringify(task);
  sessionStorage.setItem(id, json);
}

const storeTaskId = (id) => {
  let taskIds = JSON.parse(sessionStorage.getItem("taskIds")) || []
  let newTaskIds = taskIds.concat(id)
  sessionStorage.setItem("taskIds", JSON.stringify(newTaskIds))
}

const removeTask = (id) => {
  sessionStorage.removeItem(id)
}

const removeTaskId = (id) => {
  let taskIds = JSON.parse(sessionStorage.getItem("taskIds")) || []
  let newTaskIds = taskIds.filter(taskId => taskId !== id)
  sessionStorage.setItem("taskIds", JSON.stringify(newTaskIds))
}

class TaskService {
  static set subscriptions(_subscriptions) {
    this._subscriptions = _subscriptions;
  }

  static get subscriptions() {
    return this._subscriptions || [];
  }

  static subscribe(callback) {
    this.subscriptions = _.union(this.subscriptions, [callback])
  }

  static unsubscribe(callback) {
    this.subscriptions = _.pull(this.subscriptions, callback)
  }

  static publishChange() {
    this.subscriptions.forEach((callback) => callback(this.getAll()))
  }

  static getAll() {
    let taskIds = JSON.parse(sessionStorage.getItem('taskIds')) || []
    let tasks = taskIds.map(id => {
      return JSON.parse(sessionStorage.getItem(id))
    })
    return tasks;
  }

  static create(task) {
    const id = generateId();
    task = {...task, ...{id: id}}
    storeTask(id, task)
    storeTaskId(id)

    this.publishChange();
  }

  static delete(taskId) {
    console.log(taskId, 'taskId double check')
    removeTask(taskId)
    removeTaskId(taskId)

    this.publishChange();
  }

}

export default TaskService;
