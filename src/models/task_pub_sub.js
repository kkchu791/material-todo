import _ from 'lodash';
import TaskService from './tasks'

class TaskPubSub {
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
    this.subscriptions.forEach((callback) => callback(TaskService.getAll()))
  }
}

export default TaskPubSub;