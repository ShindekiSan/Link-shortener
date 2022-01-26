import { put, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { loadLinksDataSuccess, loadLinksDataFailed, FetchLinksAction } from '../actions/loadLinksData/loadLinksData';
import { loadLinkDataSuccess, loadLinkDataFailed, FetchLinkAction } from '../actions/loadLinkData/loadLinkData';
import { editLinkDataSuccess, editLinkDataFailed, EditLinkAction } from '../actions/editLinkData/editLinkData';
import { addLinkSuccess, addLinkFailed, AddLinkAction } from '../actions/addLink/addLink';
import { LinkData, Link } from '../../types/link';
import {
  fetchLink, fetchLinks, fetchLinkEdit, fetchNewLink,
} from '../../api/links.api';
import {
  LoadLinkActionTypes, LoadLinksActionTypes, EditLinkActionTypes, AddLinkActionTypes,
} from '../actionTypes';
import handleError from '../../utils/errorHandler';

export function* getUserLinks(action: FetchLinksAction): SagaIterator<void> {
  try {
    const data:Link[] = yield call(
      fetchLinks,
      action.payload,
    );
    yield put(
      loadLinksDataSuccess(data),
    );
  } catch (e: unknown) {
    yield put(
      loadLinksDataFailed(handleError(e)),
    );
  }
}

export function* getUserLink(action: FetchLinkAction): SagaIterator<void> {
  try {
    const data:LinkData = yield call(
      fetchLink,
      action.payload,
    );
    yield put(
      loadLinkDataSuccess(data),
    );
  } catch (e: unknown) {
    yield put(
      loadLinkDataFailed(handleError(e)),
    );
  }
}

export function* getEditLink(action: EditLinkAction): SagaIterator<void> {
  try {
    const data:LinkData = yield call(fetchLinkEdit, action.payload);
    yield put(
      editLinkDataSuccess(data),
    );
  } catch (e) {
    yield put(
      editLinkDataFailed(handleError(e)),
    );
  }
}

export function* addUserLink(action: AddLinkAction): SagaIterator<void> {
  try {
    const data:LinkData = yield call(
      fetchNewLink,
      action.payload,
    );
    yield put(
      addLinkSuccess(data),
    );
  } catch (e: unknown) {
    yield put(
      addLinkFailed(handleError(e)),
    );
  }
}

export default function* linksWatcher() {
  yield takeEvery(LoadLinkActionTypes.LOAD_LINK_DATA, getUserLink);
  yield takeEvery(LoadLinksActionTypes.LOAD_LINKS_DATA, getUserLinks);
  yield takeEvery(EditLinkActionTypes.EDIT_LINK_DATA, getEditLink);
  yield takeEvery(AddLinkActionTypes.ADD_LINK_DATA, addUserLink);
}
