const generateId = () => {
  return Math.random().toString(36).substring(6);
}

const storeTask = (id, properties) => {
  const json = JSON.stringify(properties);
  sessionStorage.setItem(id, json);
}

const storeTaskId = (id) => {
  let taskIds = JSON.parse(sessionStorage.getItem("taskIds")) || []
  let newTaskIds = taskIds.concat(id)
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

  static create(taskProperties) {
    const id = generateId();
    storeTask(id, taskProperties)
    storeTaskId(id)

    return taskProperties;
  }
}

export default TaskService;
