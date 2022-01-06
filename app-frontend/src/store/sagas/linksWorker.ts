import { put, call, takeEvery } from 'redux-saga/effects';
import { loadLinksDataSuccess, loadLinksDataFailed, FetchLinksAction } from '../actions/loadLinksData/loadLinksData';
import { loadLinkDataSuccess, loadLinkDataFailed, FetchLinkAction } from '../actions/loadLinkData/loadLinkData';
import { editLinkDataSuccess, editLinkDataFailed, EditLinkAction } from '../actions/editLinkData/editLinkData';
import { addLinkSuccess, addLinkFailed, AddLinkAction } from '../actions/addLink/addLink';
import { LinkData, Link } from '../../types/link';
import {
  fetchLink, fetchLinks, fetchLinkEdit, fetchNewLink,
} from './api/links.api';
import {
  LoadLinkActionTypes, LoadLinksActionTypes, EditLinkActionTypes, AddLinkActionTypes,
} from '../actionTypes';

export function* getUserLinks(action: FetchLinksAction) {
  try {
    const data:Link[] = yield call(
      fetchLinks,
      action.payload,
    );
    yield put(
      loadLinksDataSuccess(data),
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(
        loadLinksDataFailed(e.message),
      );
    } else {
      yield put(
        loadLinksDataFailed(String(e)),
      );
    }
  }
}

export function* getUserLink(action: FetchLinkAction) {
  try {
    const data:LinkData = yield call(
      fetchLink,
      action.payload,
    );
    yield put(
      loadLinkDataSuccess(data),
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(
        loadLinkDataFailed(e.message),
      );
    } else {
      yield put(
        loadLinkDataFailed(String(e)),
      );
    }
  }
}

export function* getEditLink(action: EditLinkAction) {
  try {
    const data:LinkData = yield call(fetchLinkEdit, action.payload);
    yield put(
      editLinkDataSuccess(data),
    );
  } catch (e) {
    if (e instanceof Error) {
      yield put(
        editLinkDataFailed(e.message),
      );
    } else {
      yield put(
        editLinkDataFailed(String(e)),
      );
    }
  }
}

export function* addLink(action: AddLinkAction) {
  try {
    const data:LinkData = yield call(
      fetchNewLink,
      action.payload,
    );
    yield put(
      addLinkSuccess(data),
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(
        addLinkFailed(e.message),
      );
    } else {
      yield put(
        addLinkFailed(String(e)),
      );
    }
  }
}

export default function* linksWatcher() {
  yield takeEvery(LoadLinkActionTypes.LOAD_LINK_DATA, getUserLink);
  yield takeEvery(LoadLinksActionTypes.LOAD_LINKS_DATA, getUserLinks);
  yield takeEvery(EditLinkActionTypes.EDIT_LINK_DATA, getEditLink);
  yield takeEvery(AddLinkActionTypes.ADD_LINK_DATA, addLink);
}
