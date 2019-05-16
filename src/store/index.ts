import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({});

export const configureStore = () => createStore(rootReducer);
export default configureStore;
