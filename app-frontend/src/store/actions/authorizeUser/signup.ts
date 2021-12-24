import { SignupData, UserData } from '../../../types/user';

export enum RegisterActionTypes {
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_DATA = 'REGISTER_USER_DATA',
  REGISTER_USER_FAILED = 'REGISTER_USER_FAILED',
}

interface RegisterUserAction {
  type: RegisterActionTypes.REGISTER_USER_DATA,
  payload: SignupData,
}

interface RegisterUserSuccessAction {
  type: RegisterActionTypes.REGISTER_USER_SUCCESS,
  payload: UserData,
}

interface RegisterUserFailedAction {
  type: RegisterActionTypes.REGISTER_USER_FAILED,
  payload: string,
}

export type RegisterUserActions =
RegisterUserAction | RegisterUserSuccessAction | RegisterUserFailedAction;

const signupUser = (user:SignupData): RegisterUserAction => ({
  type: RegisterActionTypes.REGISTER_USER_DATA,
  payload: user,
});

export const signupUserFailed = (error: string): RegisterUserFailedAction => ({
  type: RegisterActionTypes.REGISTER_USER_FAILED,
  payload: error,
});

export const signupUserSuccess = (data: UserData): RegisterUserSuccessAction => ({
  type: RegisterActionTypes.REGISTER_USER_SUCCESS,
  payload: data,
});

export default signupUser;
