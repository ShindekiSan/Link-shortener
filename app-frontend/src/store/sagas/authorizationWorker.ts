import { put, call, takeEvery } from 'redux-saga/effects';
import { loginUserSuccess, loginUserFailed, AuthrorizeUserAction } from '../actions/authorizeUser/login';
import { signupUserSuccess, signupUserFailed, RegisterUserAction } from '../actions/authorizeUser/signup';
import { getCurrentUserSuccess, getCurrentUserFailed, GetCurrentUserAction } from '../actions/authorizeUser/getCurrentUser';
import { UserData } from '../../types/user';
import { fetchCurrentUser, fetchRegistration, fecthAuthorization } from './api/authorization.api';
import {
  AuthorizeActionTypes, RegisterActionTypes, GetCurrentUserActionTypes, LogoutActionType,
} from '../actionTypes';

const MAIN_PAGE_LOCATION = 'http://localhost:8081';

const setUserCookie = (name: string, value?: string): void => {
  document.cookie = `${name}=${value}; path=/`;
};

const deleteUserCookie = (name: string): void => {
  document.cookie = `${name}=; max-age=${-1}`;
};

export function* authorizeUser(action: AuthrorizeUserAction) {
  try {
    const data:UserData = yield call(
      fecthAuthorization,
      action.payload,
    );
    yield call(setUserCookie, 'user', data.data?.userId);
    yield put(
      loginUserSuccess(data),
    );
    window.location.replace(MAIN_PAGE_LOCATION);
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(
        loginUserFailed(e.message),
      );
    } else {
      yield put(
        loginUserFailed(String(e)),
      );
    }
  }
}

export function* registerUser(action: RegisterUserAction) {
  try {
    const data:UserData = yield call(fetchRegistration, action.payload);
    yield call(setUserCookie, 'user', data.data?.userId);
    yield put(
      signupUserSuccess(data),
    );
    window.location.replace(MAIN_PAGE_LOCATION);
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

export function* getUser(action: GetCurrentUserAction) {
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
  window.location.replace(MAIN_PAGE_LOCATION);
}

export default function* authorizationWatcher() {
  yield takeEvery(AuthorizeActionTypes.AUTHORIZE_USER_DATA, authorizeUser);
  yield takeEvery(RegisterActionTypes.REGISTER_USER_DATA, registerUser);
  yield takeEvery(GetCurrentUserActionTypes.GET_CURRENT_USER_DATA, getUser);
  yield takeEvery(LogoutActionType.LOGOUT_USER, logoutUser);
}
