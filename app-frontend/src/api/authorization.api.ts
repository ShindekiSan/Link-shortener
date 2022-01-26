import axios from 'axios';
import { SignupData, UserData, LoginData } from '../types/user';

const API_URL = 'http://localhost:5000';

export const fetchAuthorization = async (user: LoginData):Promise<UserData> => {
  const fetched = await axios({
    method: 'POST',
    url: `${API_URL}/api/auth/login`,
    data: {
      email: user.email,
      password: user.password,
    },
  });
  return { data: fetched.data };
};

export const fetchRegistration = async (user: SignupData):Promise<UserData> => {
  const fetched = await axios({
    method: 'POST',
    url: `${API_URL}/api/auth/register`,
    data: {
      email: user.email,
      password: user.password,
      username: user.username,
    },
  });
  return { data: fetched.data };
};

export const fetchCurrentUser = async (id: string):Promise<UserData> => {
  const fetched = await axios({
    method: 'GET',
    url: `${API_URL}/api/auth/get-user/${id}`,
    params: {
      id,
    },
  });
  return { data: fetched.data.user };
};
