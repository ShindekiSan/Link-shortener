import { UserData } from '../../../types/user';

export enum GetCurrentUserActionTypes {
  GET_CURRENT_USER_DATA = 'GET_CURRENT_USER_DATA',
  GET_CURRENT_USER_FAILED = 'GET_CURRENT_USER_FAILED',
  GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS',
}

interface GetCurrentUserAction {
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_DATA,
  payload: string,
}

interface GetCurrentUserSuccessAction {
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_SUCCESS,
  payload: UserData,
}

interface GetCurrentUserFailedAction {
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_FAILED,
  payload: string,
}

export type GetCurrentUserActions =
GetCurrentUserAction | GetCurrentUserSuccessAction | GetCurrentUserFailedAction;

const getCurrentUser = (id: string): GetCurrentUserAction => ({
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_DATA,
  payload: id,
});

export const getCurrentUserSuccess = (user: UserData): GetCurrentUserSuccessAction => ({
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const getCurrentUserFailed = (error: string): GetCurrentUserFailedAction => ({
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_FAILED,
  payload: error,
});

export default getCurrentUser;
