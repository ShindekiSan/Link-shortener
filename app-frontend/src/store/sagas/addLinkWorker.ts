import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL } from '../contants';
import { addLinkSuccess, addLinkFailed } from '../actions/addLink/addLink';
import {
  AddLink,
} from '../../types/link';

const fetchLink = async (linkParams: AddLink):Promise<string> => {
  const data = await axios({
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
  return data.data.message;
};

export function* addLink(action: { type: string, payload: AddLink }) { // eslint-disable-line
  try {
    const data:string = yield call(
      fetchLink,
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
    }
  }
}
