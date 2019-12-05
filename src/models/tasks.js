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

    return task;
  }

  static delete(taskId) {
    console.log(taskId, 'taskId double check')
    removeTask(taskId)
    removeTaskId(taskId)
  }

}

export default TaskService;
