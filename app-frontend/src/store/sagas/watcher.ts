import { all } from 'redux-saga/effects';
import authorizationWatcher from './authorizationWorker';
import linksWatcher from './linksWorker';
import searchedLinksWatcher from './searchedLinksWorker';

export default function* sagaWatcher() {
  yield all([
    authorizationWatcher(),
    linksWatcher(),
    searchedLinksWatcher(),
  ]);
}
