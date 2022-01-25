import { UserData } from '../../../types/user';
import { GetCurrentUserActionTypes } from '../../actionTypes';

export interface GetCurrentUserAction {
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_DATA,
  payload: string,
}

interface GetCurrentUserSuccessAction {
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_SUCCESS,
  payload: UserData | null,
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

export const getCurrentUserSuccess = (user: UserData | null): GetCurrentUserSuccessAction => ({
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const getCurrentUserFailed = (error: string): GetCurrentUserFailedAction => ({
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_FAILED,
  payload: error,
});

export default getCurrentUser;
