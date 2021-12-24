import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL } from '../constants';
import { loadLinksDataSuccess, loadLinksDataFailed } from '../actions/loadLinksData/loadLinksData';
import { loadLinkDataSuccess, loadLinkDataFailed } from '../actions/loadLinkData/loadLinkData';
import { editLinkDataSuccess, editLinkDataFailed } from '../actions/editLinkData/editLinkData';
import { addLinkSuccess, addLinkFailed } from '../actions/addLink/addLink';
import {
  LinkEdit, LinkId, AddLink, LinkData, Link,
} from '../../types/link';

const fetchLinks = async (token: string):Promise<Link[]> => {
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
  const fetched = await axios({
    url: `${API_URL}/api/link/${linkParams.id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${linkParams.token}`,
    },
    params: {
      id: linkParams.id,
    },
  });
  return { data: fetched.data.link };
};

const fetchLinkEdit = async (linkParams: LinkEdit):Promise<LinkData> => {
  const fetched = await axios({
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
  return { data: fetched.data.link };
};

const fetchNewLink = async (linkParams: AddLink):Promise<LinkData> => {
  const fetched = await axios({
    url: `${API_URL}/api/link/generate`,
    method: 'POST',
    data: {
      from: linkParams.from,
      tags: linkParams.tags,
      description: linkParams.description,
    },
    headers: {
      Authorization: `Bearer ${linkParams.token}`,
    },
  });
  return { data: fetched.data };
};

export function* getUserLinks(action: { type: string, payload: string }) {
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
    } else {
      yield put(
        loadLinkDataFailed(String(e)),
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
    } else {
      yield put(
        editLinkDataFailed(String(e)),
      );
    }
  }
}

export function* addLink(action: { type: string, payload: AddLink }) {
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
