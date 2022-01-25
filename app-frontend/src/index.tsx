import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import createSagaMiddlware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import sagaWatcher from './store/sagas/watcher';
import root, { history } from './store/reducers/root';
import App from './components/App';

const saga = createSagaMiddlware();
const router = routerMiddleware(history);
const store = createStore(
  root,
  composeWithDevTools(applyMiddleware(
    saga,
    router,
  )),
);

saga.run(sagaWatcher);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root'),
);
