import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL } from '../constants';
import { loginUserSuccess, loginUserFailed } from '../actions/authorizeUser/login';
import { signupUserSuccess, signupUserFailed } from '../actions/authorizeUser/signup';
import { getCurrentUserSuccess, getCurrentUserFailed } from '../actions/authorizeUser/getCurrentUser';
import { LoginData, SignupData, UserData } from '../../types/user';

const setUserCookie = (name: string, value?: string): void => {
  document.cookie = `${name}=${value}; path=/`;
};

const deleteUserCookie = (name: string): void => {
  document.cookie = `${name}=; max-age=${-1}`;
};

const fecthAuthorization = async (user: LoginData):Promise<UserData> => {
  const fetched = await axios({
    method: 'POST',
    url: `${API_URL}/api/auth/login`,
    data: {
      email: user.email,
      password: user.password,
    },
  });
  return { data: fetched.data };
};

const fetchRegistration = async (user: SignupData):Promise<UserData> => {
  const fetched = await axios({
    method: 'POST',
    url: `${API_URL}/api/auth/register`,
    data: {
      email: user.email,
      password: user.password,
      username: user.username,
    },
  });
  return { data: fetched.data };
};

const fetchCurrentUser = async (id: string):Promise<UserData> => {
  const fetched = await axios({
    method: 'GET',
    url: `${API_URL}/api/auth/get-user/${id}`,
    params: {
      id,
    },
  });
  return { data: fetched.data.user };
};

export function* authorizeUser(action: { type: string, payload: LoginData }) {
  try {
    const data:UserData = yield call(
      fecthAuthorization,
      action.payload,
    );
    yield call(setUserCookie, 'user', data.data?.userId);
    yield put(
      loginUserSuccess(data),
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(
        loginUserFailed(e.message),
      );
    }
  }
}

export function* registerUser(action: { type: string, payload: SignupData }) {
  try {
    const data:UserData = yield call(fetchRegistration, action.payload);
    yield call(setUserCookie, 'user', data.data?.userId);
    yield put(
      signupUserSuccess(data),
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(
        signupUserFailed(e.message),
      );
    } else {
      yield put(
        signupUserFailed(String(e)),
      );
    }
  }
}

export function* getUser(action: { type: string, payload: string }) {
  try {
    const data:UserData = yield call(fetchCurrentUser, action.payload);
    yield put(
      getCurrentUserSuccess(data),
    );
  } catch (e) {
    if (e instanceof Error) {
      yield put(
        getCurrentUserFailed(e.message),
      );
    } else {
      yield put(
        getCurrentUserFailed(String(e)),
      );
    }
  }
}

export function* logoutUser() {
  yield call(deleteUserCookie, 'user');
}
