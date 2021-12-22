import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
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
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root'),
);
