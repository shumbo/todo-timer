import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import TaskReducer, { TaskActions, TaskState } from './task';

const rootReducer = combineReducers({
  task: TaskReducer,
});

export type RootState = {
  task: TaskState;
};

export type RootAction = TaskActions;

export const configureStore = () =>
  createStore(rootReducer, applyMiddleware(logger));
export default configureStore();
