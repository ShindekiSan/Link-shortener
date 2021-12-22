import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL } from '../contants';
import { loginUserSuccess, loginUserFailed } from '../actions/authorizeUser/login';
import { signupUserSuccess, signupUserFailed } from '../actions/authorizeUser/signup';
import { LoginData, UserInterface, SignupData } from '../../types/user';

const fecthAuthorization = async (user: LoginData):Promise<UserInterface> => {
  const data = await axios({
    method: 'POST',
    url: `${API_URL}/api/auth/login`,
    data: {
      email: user.email,
      password: user.password,
    },
  });
  return { ...data.data };
};

const fetchRegistration = async (user: SignupData):Promise<UserInterface> => {
  const data = await axios({
    method: 'POST',
    url: `${API_URL}/api/auth/register`,
    data: {
      email: user.email,
      password: user.password,
      username: user.username,
    },
  });
  return { ...data.data };
};

export function* authorizeUser(action: { type: string, payload: LoginData }) {
  try {
    const data:UserInterface = yield call(
      fecthAuthorization,
      action.payload,
    );
    yield put(
      loginUserSuccess(data),
    );
  } catch (e: any) {
    yield put(
      loginUserFailed(e.message),
    );
  }
}

export function* registerUser(action: { type: string, payload: SignupData }) {
  try {
    const data:UserInterface = yield call(fetchRegistration, action.payload);
    yield put(
      signupUserSuccess(data),
    );
  } catch (e: any) {
    yield put(
      signupUserFailed(e.message),
    );
  }
}
