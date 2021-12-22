import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL } from '../contants';
import { loadLinksDataSuccess, loadLinksDataFailed } from '../actions/loadLinksData/loadLinksData';
import { loadLinkDataSuccess, loadLinkDataFailed } from '../actions/loadLinkData/loadLinkData';
import { editLinkDataSuccess, editLinkDataFailed } from '../actions/editLinkData/editLinkData';
import {
  LinkData, LinkEdit, LinkId, LinksData,
} from '../../types/link';

const fetchLinks = async (token: string):Promise<LinksData> => {
  const data = await axios({
    url: `${API_URL}/api/link`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.links;
};

const fetchLink = async (linkParams: LinkId):Promise<LinkData> => {
  const data = await axios({
    url: `${API_URL}/api/link/${linkParams.id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${linkParams.token}`,
    },
    params: {
      id: linkParams.id,
    },
  });
  return data.data.link;
};

const fetchLinkEdit = async (linkParams: LinkEdit):Promise<LinkData> => {
  const data = await axios({
    url: `${API_URL}/api/link/edit`,
    method: 'POST',
    data: {
      description: linkParams.description,
      tags: linkParams.tags,
      code: linkParams.code,
    },
    headers: {
      Authorization: `Bearer ${linkParams.token}`,
    },
  });
  return data.data.link;
};

export function* getUserLinks(action: { type: string, payload: string }) { // eslint-disable-line
  try {
    const data:LinksData = yield call(
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
    }
  }
}

export function* getUserLink(action: { type: string, payload: LinkId }) {
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
    }
  }
}

export function* getEditLink(action: { type: string, payload: LinkEdit }) {
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
    }
  }
}
