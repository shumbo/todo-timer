import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';

import TaskReducer, { TaskActions, TaskState } from './task';

const rootReducer = combineReducers({
  task: TaskReducer,
});

export type RootState = {
  task: TaskState;
};

export type RootAction = TaskActions;

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => {
  let store = createStore(persistedReducer, applyMiddleware(logger));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore();
