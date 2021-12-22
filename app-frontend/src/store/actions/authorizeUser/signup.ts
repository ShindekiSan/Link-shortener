import { REGISTER_USER_DATA, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED } from '../../contants';
import { UserInterface, SignupData } from '../../../types/user';

const signupUser = (user:SignupData) => ({
  type: REGISTER_USER_DATA,
  payload: user,
});

export const signupUserFailed = (error: string) => ({
  type: REGISTER_USER_FAILED,
  payload: error,
});

export const signupUserSuccess = (data: UserInterface) => ({
  type: REGISTER_USER_SUCCESS,
  payload: data,
});

export default signupUser;
