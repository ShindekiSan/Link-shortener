import { put, call, takeEvery } from 'redux-saga/effects';
import { loadSearchedLinksDataSuccess, loadSearchedLinksDataFailed, FetchSearchedLinksAction } from '../actions/loadSearchedLinksData/loadSearchedLinksData';
import { loadSearchedLinkDataSuccess, loadSearchedLinkDataFailed, FetchSearchedLinkAction } from '../actions/loadSearchedLinkData/loadSearchedLinkData';
import { SearchedLink, SearchedLinkData } from '../../types/link';
import { fetchLink, fetchLinks } from './api/searchedLinks.api';
import {
  LoadSearchedLinkActionTypes, LoadSearchedLinksActionTypes,
} from '../actionTypes';

export function* getSearchedLinks(action: FetchSearchedLinksAction) {
  try {
    const data:SearchedLink[] = yield call(
      fetchLinks,
      action.payload,
    );
    yield put(
      loadSearchedLinksDataSuccess(data),
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(
        loadSearchedLinksDataFailed(e.message),
      );
    } else {
      yield put(
        loadSearchedLinksDataFailed(String(e)),
      );
    }
  }
}

export function* getSearchedLink(action: FetchSearchedLinkAction) {
  try {
    const data:SearchedLinkData = yield call(
      fetchLink,
      action.payload,
    );
    yield put(
      loadSearchedLinkDataSuccess(data),
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(
        loadSearchedLinkDataFailed(e.message),
      );
    } else {
      yield put(
        loadSearchedLinkDataFailed(String(e)),
      );
    }
  }
}

export default function* searchedLinksWatcher() {
  yield takeEvery(LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_DATA, getSearchedLink);
  yield takeEvery(LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_DATA, getSearchedLinks);
}
