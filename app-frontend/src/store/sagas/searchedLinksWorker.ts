import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL } from '../contants';
import { loadSearchedLinksDataSuccess, loadSearchedLinksDataFailed } from '../actions/loadSearchedLinksData/loadSearchedLinksData';
import { loadSearchedLinkDataSuccess, loadSearchedLinkDataFailed } from '../actions/loadSearchedLinkData/loadSearchedLinkData';
import { SearchedLinkData, SearchedLinksData } from '../../types/link';

const fetchLinks = async (tag: string):Promise<SearchedLinksData> => {
  const data = await axios({
    url: `${API_URL}/api/link/search/${tag}`,
    method: 'GET',
    params: {
      tagName: tag,
    },
  });
  return data.data.links;
};

const fetchLink = async (linkId: string | undefined):Promise<SearchedLinkData> => {
  const data = await axios({
    url: `${API_URL}/api/link/link-info/${linkId}`,
    method: 'GET',
    params: {
      id: linkId,
    },
  });
  return data.data.link;
};

export function* getSearchedLinks(action: { type: string, payload: string }) { // eslint-disable-line
  try {
    const data:SearchedLinksData = yield call(
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
    }
  }
}

export function* getSearchedLink(action: { type: string, payload: string | undefined }) {
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
    }
  }
}
