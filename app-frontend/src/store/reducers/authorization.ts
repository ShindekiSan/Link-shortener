import { UserData } from '../../types/user';
import { AuthrorizeUserActions } from '../actions/authorizeUser/login';
import { RegisterUserActions } from '../actions/authorizeUser/signup';
import { GetCurrentUserActions } from '../actions/authorizeUser/getCurrentUser';
import { LogoutActions } from '../actions/authorizeUser/logout';
import {
  AuthorizeActionTypes, RegisterActionTypes, GetCurrentUserActionTypes, LogoutActionType,
} from '../actionTypes';

const findUserCookie = () => {
  const cookies = document.cookie.split('; ');
  if (cookies !== undefined) {
    const cookieValue = cookies.find((row) => row.startsWith('user='))?.split('=')[1];
    return cookieValue!;
  }
  return null;
};

export const initialState: UserState = {
  data: null,
  error: '',
  loading: false,
  userCookie: findUserCookie(),
};

type UserActionTypes =
AuthrorizeUserActions | RegisterUserActions | GetCurrentUserActions | LogoutActions;

export interface UserState {
  data: UserData | null,
  error: string,
  loading: boolean,
  userCookie: null | string,
}

const authorizeUser = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case AuthorizeActionTypes.AUTHORIZE_USER_DATA:
    case RegisterActionTypes.REGISTER_USER_DATA:
    case GetCurrentUserActionTypes.GET_CURRENT_USER_DATA:
      return {
        ...state,
        loading: true,
      };
    case AuthorizeActionTypes.AUTHORIZE_USER_FAILED:
    case RegisterActionTypes.REGISTER_USER_FAILED:
    case GetCurrentUserActionTypes.GET_CURRENT_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AuthorizeActionTypes.AUTHORIZE_USER_SUCCESS:
    case RegisterActionTypes.REGISTER_USER_SUCCESS:
    case GetCurrentUserActionTypes.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case LogoutActionType.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authorizeUser;
