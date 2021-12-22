import { GET_CURRENT_USER_DATA, GET_CURRENT_USER_FAILED, GET_CURRENT_USER_SUCCESS } from '../../contants';
import { UserInterface } from '../../../types/user';

const getCurrentUser = (id: string) => ({
  type: GET_CURRENT_USER_DATA,
  payload: id,
});

export const getCurrentUserSuccess = (user: UserInterface) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const getCurrentUserFailed = (error: string) => ({
  type: GET_CURRENT_USER_FAILED,
  payload: error,
});

export default getCurrentUser;
