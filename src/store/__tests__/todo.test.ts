import * as Todo from '../todo';
import { createStore, Store } from 'redux';
import reducer from '../todo';
import { Status, Filter } from '../../models/task.model';

describe('Todo', () => {
  let store: Store<Todo.TodoState>;
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
    store.dispatch(Todo.addTaskAction({ title: 'demo todo' }));
    expect(store.getState().tasks.length).toBe(1);
  });
  it('should handle COMPLETE_TASK', () => {
    store.dispatch(Todo.addTaskAction({ title: 'demo todo' }));
    store.dispatch(Todo.addTaskAction({ title: 'demo todo2' }));
    store.dispatch(Todo.completeTaskAction(store.getState().tasks[0].id));
    expect(
      store.getState().tasks.filter(task => task.status === Status.DONE).length
    ).toBe(1);
  });
  it('should handle START_TASK', () => {
    store.dispatch(Todo.addTaskAction({ title: 'demo todo' }));
    store.dispatch(Todo.addTaskAction({ title: 'demo todo2' }));
    const taskId = store.getState().tasks[0].id;
    store.dispatch(Todo.startTaskAction(taskId));
    expect(
      store.getState().tasks.find(task => task.id === taskId)!.status
    ).toBe(Status.IN_PROGRESS);
    expect(store.getState().timer.ongoingTaskId).toBe(taskId);
    expect(store.getState().timer.startAt).toBeTruthy();
  });
  it('should handle STOP_TASK', () => {
    store.dispatch(Todo.addTaskAction({ title: 'demo todo' }));
    store.dispatch(Todo.addTaskAction({ title: 'demo todo2' }));
    const taskId = store.getState().tasks[0].id;
    store.dispatch(Todo.startTaskAction(taskId));
    store.dispatch(Todo.stopTaskAction());
    expect(store.getState().timer).toEqual({}); // reset
    expect(store.getState().tasks[0].history.length).toBe(1);
    expect(store.getState().tasks[0].status).toBe(Status.TODO);
  });
  it('should handle SET_FILTER', () => {
    store.dispatch(Todo.setFilterAction(Status.DONE));
    expect(store.getState().filter).toEqual(Status.DONE); // reset
  });
});
