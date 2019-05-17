import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import fromStore from './store';

import './index.css';

const root = document.querySelector('#root');
ReactDOM.render(
  <Provider store={fromStore.store}>
    <PersistGate loading={null} persistor={fromStore.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  root
);
