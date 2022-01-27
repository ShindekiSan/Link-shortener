import authorizeUser, { initialState, UserState } from '../authorization';
import signupUser, { signupUserFailed, signupUserSuccess } from '../../actions/authorizeUser/signup';
import loginUser, { loginUserFailed, loginUserSuccess } from '../../actions/authorizeUser/login';
import logoutUser from '../../actions/authorizeUser/logout';
import getCurrentUser, { getCurrentUserFailed, getCurrentUserSuccess } from '../../actions/authorizeUser/getCurrentUser';
import { userData } from '../../../mocks/store/constants';

const authorizedUser = {
  data: userData,
};

const loadingState: UserState = {
  ...initialState,
  loading: true,
};

describe('user reducer', () => {
  describe('should return loading=true', () => {
    it('When dispatching AUTHORIZE_USER_DATA action', () => {
      const user = {
        email: '1@gmail.com',
        password: '111111',
      };
      const reducer = authorizeUser(initialState, loginUser(user));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('When dispatching REGISTER_USER_DATA action', () => {
      const registerUser = {
        email: '1@gmail.com',
        password: '111111',
        username: 'test',
      };
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
      const reducer = authorizeUser(loadingState, loginUserFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });

    it('When dispatching REGISTER_USER_FAILED action', () => {
      const reducer = authorizeUser(loadingState, signupUserFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });

    it('When dispatching GET_CURRENT_USER_FAILED action', () => {
      const reducer = authorizeUser(loadingState, getCurrentUserFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });
  });

  describe('Should return a user data', () => {
    it('When dispatching AUTHORIZE_USER_SUCCESS action', () => {
      const reducer = authorizeUser(loadingState, loginUserSuccess(authorizedUser));
      expect(reducer).toEqual({
        ...initialState,
        data: authorizedUser,
      });
    });

    it('When dispatching REGISTER_USER_SUCCESS action', () => {
      const reducer = authorizeUser(loadingState, signupUserSuccess(authorizedUser));
      expect(reducer).toEqual({
        ...initialState,
        data: authorizedUser,
      });
    });

    it('When dispatching GET_CURRENT_USER_SUCCESS action', () => {
      const reducer = authorizeUser(loadingState, getCurrentUserSuccess(authorizedUser));
      expect(reducer).toEqual({
        ...initialState,
        data: authorizedUser,
      });
    });

    describe('Should return initial state', () => {
      it('When dispatching LOGOUT_USER action', () => {
        const userState: UserState = {
          ...initialState,
          data: authorizedUser,
        };
        const reducer = authorizeUser(userState, logoutUser());
        expect(reducer).toEqual(initialState);
      });
    });
  });
});
