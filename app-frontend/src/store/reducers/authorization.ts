import initialState from '../initialState';
import { UserInterface } from '../../types/user';

enum ActionTypes {
  AUTHORIZE_USER_SUCCESS = 'AUTHORIZE_USER_SUCCESS',
  AUTHORIZE_USER_DATA = 'AUTHORIZE_USER_DATA',
  AUTHORIZE_USER_FAILED = 'AUTHORIZE_USER_FAILED',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_DATA = 'REGISTER_USER_DATA',
  REGISTER_USER_FAILED = 'REGISTER_USER_FAILED',
  GET_CURRENT_USER_DATA = 'GET_CURRENT_USER_DATA',
  GET_CURRENT_USER_FAILED = 'GET_CURRENT_USER_FAILED',
  GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS',
}

interface LoginUserAction {
  type: ActionTypes.AUTHORIZE_USER_DATA
  | ActionTypes.REGISTER_USER_DATA | ActionTypes.GET_CURRENT_USER_DATA,
}

interface LoginUserSuccessAction {
  type: ActionTypes.AUTHORIZE_USER_SUCCESS
  | ActionTypes.REGISTER_USER_SUCCESS | ActionTypes.GET_CURRENT_USER_SUCCESS,
  payload: UserInterface,
}

interface LoginUserFailedAction {
  type: ActionTypes.AUTHORIZE_USER_FAILED
  | ActionTypes.REGISTER_USER_FAILED | ActionTypes.GET_CURRENT_USER_FAILED,
  payload: string,
}

type UserAction = LoginUserAction | LoginUserSuccessAction | LoginUserFailedAction;

interface UserState {
  data: UserInterface,
  error: null | string,
  loading: boolean
}

const authorizeUser = (state = initialState.user, action: UserAction): UserState => { // eslint-disable-line
  switch (action.type) {
    case ActionTypes.AUTHORIZE_USER_DATA:
    case ActionTypes.REGISTER_USER_DATA:
    case ActionTypes.GET_CURRENT_USER_DATA:
      return {
        data: {} as UserInterface,
        loading: true,
        error: null,
      };
    case ActionTypes.AUTHORIZE_USER_FAILED:
    case ActionTypes.REGISTER_USER_FAILED:
    case ActionTypes.GET_CURRENT_USER_FAILED:
      return {
        data: {} as UserInterface,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.AUTHORIZE_USER_SUCCESS:
    case ActionTypes.REGISTER_USER_SUCCESS:
    case ActionTypes.GET_CURRENT_USER_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authorizeUser;
