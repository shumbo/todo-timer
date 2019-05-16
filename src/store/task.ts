import { Action, ActionCreator, Reducer } from 'redux';
import uuid from 'uuid/v4';

import { Task, TaskSeed, TaskId, Status, Filter } from '../models/task.model';

export interface TaskState {
  tasks: Task[];
  filter: Filter; // set to null if no filter to be applied
  timer: {
    ongoingTaskId?: TaskId;
    startAt?: Date;
  };
}

const initialState: TaskState = {
  tasks: [],
  filter: null,
  timer: {},
};

enum ActionTypes {
  ADD_TASK,
  START_TASK,
  STOP_TASK,
  COMPLETE_TASK,
  SET_FILTER,
}

interface AddTaskAction extends Action {
  type: ActionTypes.ADD_TASK;
  task: TaskSeed;
}
export const addTaskAction = (task: TaskSeed): AddTaskAction => ({
  type: ActionTypes.ADD_TASK,
  task,
});

interface StartTaskAction extends Action {
  type: ActionTypes.START_TASK;
  taskId: TaskId;
}
export const startTaskAction = (taskId: TaskId): StartTaskAction => ({
  type: ActionTypes.START_TASK,
  taskId,
});

interface StopTaskAction extends Action {
  type: ActionTypes.STOP_TASK;
}
export const stopTaskAction = (): StopTaskAction => ({
  type: ActionTypes.STOP_TASK,
});

interface CompleteTaskAction extends Action {
  type: ActionTypes.COMPLETE_TASK;
  taskId: TaskId;
}
export const completeTaskAction = (taskId: TaskId): CompleteTaskAction => ({
  type: ActionTypes.COMPLETE_TASK,
  taskId,
});

interface SetFilterAction extends Action {
  type: ActionTypes.SET_FILTER;
  filter: Filter;
}
export const setFilterAction = (filter: Filter): SetFilterAction => ({
  type: ActionTypes.SET_FILTER,
  filter,
});

export type TaskActions =
  | AddTaskAction
  | StartTaskAction
  | StopTaskAction
  | CompleteTaskAction
  | SetFilterAction;

const taskReducer: Reducer<TaskState, TaskActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      const task: Task = {
        ...action.task,
        status: Status.TODO,
        id: uuid(),
        history: [],
      };
      return { ...state, tasks: [task, ...state.tasks] };
    case ActionTypes.START_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.taskId
            ? { ...task, status: Status.IN_PROGRESS }
            : task.status === Status.IN_PROGRESS
            ? { ...task, status: Status.TODO }
            : task
        ),
        timer: {
          ongoingTaskId: action.taskId,
          startAt: new Date(),
        },
      };
    case ActionTypes.STOP_TASK:
      return {
        ...state,
        tasks: state.tasks.map(_task => {
          const task = { ..._task };
          if (task.status === Status.IN_PROGRESS) {
            task.status = Status.TODO;
          }
          if (task.id === state.timer.ongoingTaskId) {
            task.history.push({
              id: uuid(),
              start: state.timer.startAt!,
              end: new Date(),
            });
          }
          return task;
        }),
        timer: {},
      };
    case ActionTypes.COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.taskId ? { ...task, status: Status.DONE } : task
        ),
      };
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
};

export default taskReducer;
