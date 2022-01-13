import authorizeUser, { initialState } from '../authorization';
import signupUser, { signupUserFailed, signupUserSuccess } from '../../actions/authorizeUser/signup';
import loginUser, { loginUserFailed, loginUserSuccess } from '../../actions/authorizeUser/login';
import logoutUser from '../../actions/authorizeUser/logout';
import getCurrentUser, { getCurrentUserFailed, getCurrentUserSuccess } from '../../actions/authorizeUser/getCurrentUser';
import { userData } from '../../../mocks/store/constants';

const user = {
  email: '1@gmail.com',
  password: '111111',
};

const registerUser = {
  ...user,
  username: 'test',
};

const authorizedUser = {
  data: userData,
};

describe('user reducer', () => {
  describe('should return loading=true', () => {
    it('When dispatching AUTHORIZE_USER_DATA action', () => {
      const reducer = authorizeUser(initialState, loginUser(user));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('When dispatching REGISTER_USER_DATA action', () => {
      const reducer = authorizeUser(initialState, signupUser(registerUser));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('When dispatching GET_CURRENT_USER_DATA action', () => {
      const userId = '522';
      const reducer = authorizeUser(initialState, getCurrentUser(userId));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('Should return an error', () => {
    it('When dispatching AUTHORIZE_USER_FAILED action', () => {
      const reducer = authorizeUser(initialState, loginUserFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });

    it('When dispatching REGISTER_USER_FAILED action', () => {
      const reducer = authorizeUser(initialState, signupUserFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });

    it('When dispatching GET_CURRENT_USER_FAILED action', () => {
      const reducer = authorizeUser(initialState, getCurrentUserFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });
  });

  describe('Should return a user data', () => {
    it('When dispatching AUTHORIZE_USER_SUCCESS action', () => {
      const reducer = authorizeUser(initialState, loginUserSuccess(authorizedUser));
      expect(reducer).toEqual({
        ...initialState,
        data: authorizedUser,
      });
    });

    it('When dispatching REGISTER_USER_SUCCESS action', () => {
      const reducer = authorizeUser(initialState, signupUserSuccess(authorizedUser));
      expect(reducer).toEqual({
        ...initialState,
        data: authorizedUser,
      });
    });

    it('When dispatching GET_CURRENT_USER_SUCCESS action', () => {
      const reducer = authorizeUser(initialState, getCurrentUserSuccess(authorizedUser));
      expect(reducer).toEqual({
        ...initialState,
        data: authorizedUser,
      });
    });

    describe('Should return initial state', () => {
      it('When dispatching LOGOUT_USER action', () => {
        const reducer = authorizeUser(initialState, logoutUser());
        expect(reducer).toEqual(initialState);
      });
    });
  });
});
