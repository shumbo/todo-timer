import * as Task from '../task';
import { createStore, Store } from 'redux';
import reducer from '../task';
import { Status, Filter } from '../../models/task.model';

describe('Todo', () => {
  let store: Store<Task.TaskState>;
  beforeEach(() => {
    store = createStore(reducer);
  });
  it('should return the initial state', () => {
    expect(store.getState()).toEqual({
      tasks: [],
      filter: null,
      timer: {},
    });
  });
  it('should handle ADD_TASK', () => {
    store.dispatch(Task.addTaskAction({ title: 'demo todo' }));
    expect(store.getState().tasks.length).toBe(1);
  });
  it('should handle COMPLETE_TASK', () => {
    store.dispatch(Task.addTaskAction({ title: 'demo todo' }));
    store.dispatch(Task.addTaskAction({ title: 'demo todo2' }));
    store.dispatch(Task.completeTaskAction(store.getState().tasks[0].id));
    expect(
      store.getState().tasks.filter(task => task.status === Status.DONE).length
    ).toBe(1);
  });
  it('should handle START_TASK', () => {
    store.dispatch(Task.addTaskAction({ title: 'demo todo' }));
    store.dispatch(Task.addTaskAction({ title: 'demo todo2' }));
    const taskId = store.getState().tasks[0].id;
    store.dispatch(Task.startTaskAction(taskId));
    expect(
      store.getState().tasks.find(task => task.id === taskId)!.status
    ).toBe(Status.IN_PROGRESS);
    expect(store.getState().timer.ongoingTaskId).toBe(taskId);
    expect(store.getState().timer.startAt).toBeTruthy();
  });
  it('should set the state back to TODO if there is a task that is IN_PROGRESS', () => {
    store.dispatch(Task.addTaskAction({ title: 'demo todo' }));
    store.dispatch(Task.addTaskAction({ title: 'demo todo2' }));
    const taskId1 = store.getState().tasks[0].id;
    const taskId2 = store.getState().tasks[1].id;
    store.dispatch(Task.startTaskAction(taskId1));
    store.dispatch(Task.startTaskAction(taskId2));
    expect(
      store.getState().tasks.find(task => task.id === taskId1)!.status
    ).toBe(Status.TODO);
  });
  it('should handle STOP_TASK', () => {
    store.dispatch(Task.addTaskAction({ title: 'demo todo' }));
    store.dispatch(Task.addTaskAction({ title: 'demo todo2' }));
    const taskId = store.getState().tasks[0].id;
    store.dispatch(Task.startTaskAction(taskId));
    store.dispatch(Task.stopTaskAction());
    expect(store.getState().timer).toEqual({});
    expect(store.getState().tasks[0].history.length).toBe(1);
    expect(store.getState().tasks[0].status).toBe(Status.TODO);
  });
  it('should handle SET_FILTER', () => {
    store.dispatch(Task.setFilterAction(Status.DONE));
    expect(store.getState().filter).toEqual(Status.DONE); // reset
  });
});
