import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddlware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import sagaWatcher from './store/sagas/watcher';
import root from './store/reducers/root';
import App from './components/App';

const saga = createSagaMiddlware();
const store = createStore(root, composeWithDevTools(applyMiddleware(saga)));

saga.run(sagaWatcher);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
