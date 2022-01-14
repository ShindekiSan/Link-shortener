import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  authorizeUser, setUserCookie, registerUser, getUser, deleteUserCookie, logoutUser,
} from '../authorizationWorker';
import { userData, mockError } from '../../../mocks/store/constants';
import loginUser, { loginUserFailed, loginUserSuccess } from '../../actions/authorizeUser/login';
import { fecthAuthorization, fetchRegistration, fetchCurrentUser } from '../api/authorization.api';
import signupUser, { signupUserFailed, signupUserSuccess } from '../../actions/authorizeUser/signup';
import getCurrentUser, { getCurrentUserFailed, getCurrentUserSuccess } from '../../actions/authorizeUser/getCurrentUser';

const user = {
  email: '1@gmail.com',
  password: '111111',
};

const registeringUser = {
  ...user,
  username: 'test',
};

const data = {
  data: userData,
};

describe('authorize user saga', () => {
  it('should set new user cookie, put user data in store and navigate user to main page in try block', () => {
    const g = authorizeUser(loginUser(user));

    expect(g.next().value).toEqual(call(fecthAuthorization, user));
    expect(g.next(data).value).toEqual(put(loginUserSuccess(data)));
    expect(g.next().value).toEqual(call(setUserCookie, 'user', data.data.userId));
    expect(g.next().value).toEqual(put(push('/')));
    expect(g.next().done).toBe(true);
  });

  it('should throw an error in catch block', () => {
    const g = authorizeUser(loginUser(user));
    const error = {
      message: 'error',
    };

    g.next();
    expect(g.throw(error.message).value).toEqual(put(loginUserFailed(error.message)));
    expect(g.next().done).toBe(true);
  });
});

describe('register user saga', () => {
  it('should set new user cookie, put user data in store and navigate user to main page in try block', () => {
    const g = registerUser(signupUser(registeringUser));

    expect(g.next().value).toEqual(call(fetchRegistration, registeringUser));
    expect(g.next(data).value).toEqual(put(signupUserSuccess(data)));
    expect(g.next().value).toEqual(call(setUserCookie, 'user', data.data.userId));
    expect(g.next().value).toEqual(put(push('/')));
    expect(g.next().done).toBe(true);
  });

  it('should throw an error in catch block', () => {
    const g = registerUser(signupUser(registeringUser));

    g.next();
    expect(g.throw(mockError.message).value).toEqual(put(signupUserFailed(mockError.message)));
    expect(g.next().done).toBe(true);
  });
});

describe('get current user saga', () => {
  const id = data.data.userId;

  it('should put user data in store in try block', () => {
    const g = getUser(getCurrentUser(id));

    expect(g.next().value).toEqual(call(fetchCurrentUser, id));
    expect(g.next(data).value).toEqual(put(getCurrentUserSuccess(data)));
    expect(g.next().done).toBe(true);
  });

  it('should throw an error in catch block', () => {
    const g = getUser(getCurrentUser(id));

    g.next();
    expect(g.throw(mockError.message).value).toEqual(put(getCurrentUserFailed(mockError.message)));
    expect(g.next().done).toBe(true);
  });
});

describe('logout user saga', () => {
  it('should delete user cookie and navigate user to main page', () => {
    const g = logoutUser();

    expect(g.next().value).toEqual(call(deleteUserCookie, 'user'));
    expect(g.next().value).toEqual(put(push('/')));
    expect(g.next().value).toEqual(window.location.reload());
    expect(g.next().done).toBe(true);
  });
});
