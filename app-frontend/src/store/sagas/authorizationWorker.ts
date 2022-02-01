import { put, call, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { loginUserSuccess, loginUserFailed, AuthrorizeUserAction } from '../actions/authorizeUser/login';
import { signupUserSuccess, signupUserFailed, RegisterUserAction } from '../actions/authorizeUser/signup';
import { getCurrentUserSuccess, getCurrentUserFailed, GetCurrentUserAction } from '../actions/authorizeUser/getCurrentUser';
import { UserData } from '../../types/user';
import { fetchCurrentUser, fetchRegistration, fetchAuthorization } from '../../api/authorization.api';
import {
  AuthorizeActionTypes, RegisterActionTypes, GetCurrentUserActionTypes, LogoutActionType,
} from '../actionTypes';
import handleError from '../../utils/errorHandler';

export const setUserCookie = (name: string, value?: string): void => {
  document.cookie = `${name}=${value}; path=/`;
};

export const deleteUserCookie = (name: string): void => {
  document.cookie = `${name}=; max-age=${-1}`;
};

export function* authorizeUser(action: AuthrorizeUserAction): SagaIterator<void> {
  try {
    const data:UserData = yield call(
      fetchAuthorization,
      action.payload,
    );
    yield put(
      loginUserSuccess(data),
    );
    yield call(setUserCookie, 'user', data.data?.userId);
    yield put(push('/'));
  } catch (e: unknown) {
    yield put(
      loginUserFailed(handleError(e)),
    );
  }
}

export function* registerUser(action: RegisterUserAction): SagaIterator<void> {
  try {
    const data:UserData = yield call(fetchRegistration, action.payload);
    yield put(
      signupUserSuccess(data),
    );
    yield call(setUserCookie, 'user', data.data?.userId);
    yield put(push('/'));
  } catch (e: unknown) {
    yield put(
      signupUserFailed(handleError(e)),
    );
  }
}

export function* getUser(action: GetCurrentUserAction): SagaIterator<void> {
  try {
    const data:UserData = yield call(fetchCurrentUser, action.payload);
    yield put(
      getCurrentUserSuccess(data),
    );
  } catch (e) {
    yield put(
      getCurrentUserFailed(handleError(e)),
    );
  }
}

export function* logoutUser(): SagaIterator<void> {
  yield call(deleteUserCookie, 'user');
  yield put(push('/'));
  window.location.reload();
}

export default function* authorizationWatcher() {
  yield takeEvery(AuthorizeActionTypes.AUTHORIZE_USER_DATA, authorizeUser);
  yield takeEvery(RegisterActionTypes.REGISTER_USER_DATA, registerUser);
  yield takeEvery(GetCurrentUserActionTypes.GET_CURRENT_USER_DATA, getUser);
  yield takeEvery(LogoutActionType.LOGOUT_USER, logoutUser);
}
