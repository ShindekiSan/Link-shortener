import { push } from 'connected-react-router';
import { runSaga } from 'redux-saga';
import {
  authorizeUser, registerUser, getUser, logoutUser,
} from '../authorizationWorker';
import * as authorizationWorker from '../authorizationWorker';
import { userData, mockError } from '../../../mocks/store/constants';
import loginUser, { AuthrorizeUserActions, loginUserFailed, loginUserSuccess } from '../../actions/authorizeUser/login';
import * as api from '../../../api/authorization.api';
import signupUser, { signupUserFailed, signupUserSuccess } from '../../actions/authorizeUser/signup';
import getCurrentUser, { getCurrentUserFailed, getCurrentUserSuccess } from '../../actions/authorizeUser/getCurrentUser';

const data = {
  data: userData,
};

describe('authorize user saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const user = {
    email: '1@gmail.com',
    password: '111111',
  };

  it('should set new user cookie, put user data in store and navigate user to main page in try block', async () => {
    const fetchUser = jest.spyOn(api, 'fetchAuthorization')
      .mockImplementation(() => Promise.resolve(data));
    const setCookie = jest.spyOn(authorizationWorker, 'setUserCookie')
      .mockImplementation(() => Promise.resolve('cookie'));
    const dispatched: AuthrorizeUserActions[] = [];
    await runSaga({
      dispatch: (action: AuthrorizeUserActions) => dispatched.push(action),
    }, authorizeUser, loginUser(user)).toPromise();

    expect(fetchUser).toHaveBeenCalledTimes(1);
    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loginUserSuccess(data));
    expect(dispatched[1]).toEqual(push('/'));
  });

  it('should throw an error in catch block', async () => {
    const fetchUser = jest.spyOn(api, 'fetchAuthorization')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: AuthrorizeUserActions[] = [];
    await runSaga({
      dispatch: (action: AuthrorizeUserActions) => dispatched.push(action),
    }, authorizeUser, loginUser(user)).toPromise();

    expect(fetchUser).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loginUserFailed(mockError.message));
  });
});

describe('register user saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const registeringUser = {
    email: '1@gmail.com',
    password: '111111',
    username: 'test',
  };

  it('should set new user cookie, put user data in store and navigate user to main page in try block', async () => {
    const fetchUser = jest.spyOn(api, 'fetchRegistration')
      .mockImplementation(() => Promise.resolve(data));
    const setCookie = jest.spyOn(authorizationWorker, 'setUserCookie')
      .mockImplementation(() => Promise.resolve('cookie'));
    const dispatched: AuthrorizeUserActions[] = [];
    await runSaga({
      dispatch: (action: AuthrorizeUserActions) => dispatched.push(action),
    }, registerUser, signupUser(registeringUser)).toPromise();

    expect(fetchUser).toHaveBeenCalledTimes(1);
    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(signupUserSuccess(data));
    expect(dispatched[1]).toEqual(push('/'));
  });

  it('should throw an error in catch block', async () => {
    const fetchUser = jest.spyOn(api, 'fetchRegistration')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: AuthrorizeUserActions[] = [];
    await runSaga({
      dispatch: (action: AuthrorizeUserActions) => dispatched.push(action),
    }, registerUser, signupUser(registeringUser)).toPromise();

    expect(fetchUser).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(signupUserFailed(mockError.message));
  });
});

describe('get current user saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should put user data in store in try block', async () => {
    const fetchUser = jest.spyOn(api, 'fetchCurrentUser')
      .mockImplementation(() => Promise.resolve(data));
    const dispatched: AuthrorizeUserActions[] = [];
    await runSaga({
      dispatch: (action: AuthrorizeUserActions) => dispatched.push(action),
    }, getUser, getCurrentUser(data.data.userId)).toPromise();

    expect(fetchUser).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(getCurrentUserSuccess(data));
  });

  it('should throw an error in catch block', async () => {
    const fetchUser = jest.spyOn(api, 'fetchCurrentUser')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: AuthrorizeUserActions[] = [];
    await runSaga({
      dispatch: (action: AuthrorizeUserActions) => dispatched.push(action),
    }, getUser, getCurrentUser(data.data.userId)).toPromise();

    expect(fetchUser).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(getCurrentUserFailed(mockError.message));
  });
});

describe('logout user saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete user cookie and navigate user to main page', async () => {
    const deleteCookie = jest.spyOn(authorizationWorker, 'deleteUserCookie')
      .mockImplementation(() => Promise.resolve('cookie'));
    const dispatched: AuthrorizeUserActions[] = [];
    await runSaga({
      dispatch: (action: AuthrorizeUserActions) => dispatched.push(action),
    }, logoutUser).toPromise();

    expect(deleteCookie).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(push('/'));
  });
});
