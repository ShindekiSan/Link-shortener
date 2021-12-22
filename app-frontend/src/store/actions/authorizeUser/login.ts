import { AUTHORIZE_USER_DATA, AUTHORIZE_USER_SUCCESS, AUTHORIZE_USER_FAILED } from '../../contants';
import { LoginData, UserInterface } from '../../../types/user';

const loginUser = (user:LoginData) => ({
  type: AUTHORIZE_USER_DATA,
  payload: user,
});

export const loginUserFailed = (error: string) => ({
  type: AUTHORIZE_USER_FAILED,
  payload: error,
});

export const loginUserSuccess = (data: UserInterface) => ({
  type: AUTHORIZE_USER_SUCCESS,
  payload: data,
});

export default loginUser;
