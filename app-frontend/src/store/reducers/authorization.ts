import { UserData } from '../../types/user';
import { AuthorizeActionTypes, AuthrorizeUserActions } from '../actions/authorizeUser/login';
import { RegisterActionTypes, RegisterUserActions } from '../actions/authorizeUser/signup';
import { GetCurrentUserActionTypes, GetCurrentUserActions } from '../actions/authorizeUser/getCurrentUser';
import { LogoutActionType, LogoutActions } from '../actions/authorizeUser/logout';

const initialState: UserState = {
  data: {},
  error: '',
  loading: false,
};

type UserActionTypes =
AuthrorizeUserActions | RegisterUserActions | GetCurrentUserActions | LogoutActions;

interface UserState {
  data: UserData,
  error: string,
  loading: boolean
}

const authorizeUser = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case AuthorizeActionTypes.AUTHORIZE_USER_DATA:
    case RegisterActionTypes.REGISTER_USER_DATA:
    case GetCurrentUserActionTypes.GET_CURRENT_USER_DATA:
      return {
        data: {},
        loading: true,
        error: '',
      };
    case AuthorizeActionTypes.AUTHORIZE_USER_FAILED:
    case RegisterActionTypes.REGISTER_USER_FAILED:
    case GetCurrentUserActionTypes.GET_CURRENT_USER_FAILED:
      return {
        data: {},
        loading: false,
        error: action.payload,
      };
    case AuthorizeActionTypes.AUTHORIZE_USER_SUCCESS:
    case RegisterActionTypes.REGISTER_USER_SUCCESS:
    case GetCurrentUserActionTypes.GET_CURRENT_USER_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        error: '',
      };
    case LogoutActionType.LOGOUT_USER:
      return {
        data: {},
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};

export default authorizeUser;
