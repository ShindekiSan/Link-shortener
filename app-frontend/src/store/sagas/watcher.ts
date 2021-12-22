import { takeEvery } from 'redux-saga/effects';
import {
  ADD_LINK_DATA,
  AUTHORIZE_USER_DATA,
  EDIT_LINK_DATA,
  GET_CURRENT_USER_DATA,
  LOAD_LINKS_DATA,
  LOAD_LINK_DATA,
  LOAD_SEARCHED_LINKS_DATA,
  LOAD_SEARCHED_LINK_DATA,
  REGISTER_USER_DATA,
} from '../contants';
import { addLink } from './addLinkWorker';
import { authorizeUser, registerUser, getUser } from './authorizationWorker';
import { getEditLink, getUserLink, getUserLinks } from './linksWorker';
import { getSearchedLink, getSearchedLinks } from './searchedLinksWorker';

export default function* sagaWatcher() {
  yield takeEvery(AUTHORIZE_USER_DATA, authorizeUser);
  yield takeEvery(REGISTER_USER_DATA, registerUser);
  yield takeEvery(LOAD_LINKS_DATA, getUserLinks);
  yield takeEvery(LOAD_LINK_DATA, getUserLink);
  yield takeEvery(GET_CURRENT_USER_DATA, getUser);
  yield takeEvery(LOAD_SEARCHED_LINKS_DATA, getSearchedLinks);
  yield takeEvery(LOAD_SEARCHED_LINK_DATA, getSearchedLink);
  yield takeEvery(ADD_LINK_DATA, addLink);
  yield takeEvery(EDIT_LINK_DATA, getEditLink);
}
