import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/http.hook';
import LogIn from '../../components/AuthPage/LogIn';

import AuthContext from '../../context/AuthContext';

type LoginForm = {
  email: string,
  password: string,
};

const LogInContainer = function LogInContainer() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [error, setError] = useState<string>('');
  const {
    loading, request,
  } = useHttp();
  const [form, setForm] = useState<LoginForm>({
    email: '', password: '',
  });

  const authorizationHandler = async (): Promise<void> => {
    try {
      const data = await request('http://localhost:5000/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId, data.userName);
      navigate('/');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  return (
    <LogIn
      changeHandler={changeHandler}
      authorizationHandler={authorizationHandler}
      loading={loading}
      error={error}
    />
  );
};

export default LogInContainer;
