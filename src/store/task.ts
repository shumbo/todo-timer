import { Action, Reducer } from 'redux';
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
  EDIT_TASK,
  DELETE_TASK,
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

interface EditTaskAction extends Action {
  type: ActionTypes.EDIT_TASK;
  task: Task;
}
export const editTaskAction = (task: Task): EditTaskAction => ({
  type: ActionTypes.EDIT_TASK,
  task,
});

interface DeleteTaskAction extends Action {
  type: ActionTypes.DELETE_TASK;
  taskId: TaskId;
}
export const deleteTaskAction = (taskId: TaskId): DeleteTaskAction => ({
  type: ActionTypes.DELETE_TASK,
  taskId,
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
  | EditTaskAction
  | DeleteTaskAction
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
    case ActionTypes.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(
          task =>
            task.id === action.task.id // match the task to update with id
              ? action.task.status === Status.IN_PROGRESS // cannot set to IN_PROGRESS
                ? { ...action.task, status: task.status } // use original status
                : action.task // update task
              : task // return original task otherwise
        ),
      };
    case ActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(({ id }) => id !== action.taskId),
      };
    case ActionTypes.START_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.taskId
            ? { ...task, status: Status.IN_PROGRESS } // the task to start
            : task.id === state.timer.ongoingTaskId // current task in progress that is recorded in timer
            ? {
                ...task,
                status: Status.TODO,
                history: [
                  ...task.history,
                  {
                    id: uuid(),
                    start: state.timer.startAt!,
                    end: new Date(),
                  },
                ], // append the log to history
              }
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
        tasks: state.tasks.map(task => {
          return task.id === state.timer.ongoingTaskId
            ? {
                ...task,
                status: Status.TODO,
                history: [
                  ...task.history,
                  {
                    id: uuid(),
                    start: state.timer.startAt!,
                    end: new Date(),
                  },
                ],
              }
            : task;
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
