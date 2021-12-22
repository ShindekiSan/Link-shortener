import { takeEvery } from 'redux-saga/effects';
import {
  AUTHORIZE_USER_DATA, LOAD_LINKS_DATA, LOAD_LINK_DATA, REGISTER_USER_DATA,
} from '../contants';
import { authorizeUser, registerUser } from './authorizationWorker';
import { getUserLink, getUserLinks } from './linksWorker';

export default function* sagaWatcher() {
  yield takeEvery(AUTHORIZE_USER_DATA, authorizeUser);
  yield takeEvery(REGISTER_USER_DATA, registerUser);
  yield takeEvery(LOAD_LINKS_DATA, getUserLinks);
  yield takeEvery(LOAD_LINK_DATA, getUserLink);
}
