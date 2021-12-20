import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/http.hook';
import LogIn from '../../components/AuthPage/LogIn';
import loginUser from '../../store/actions/authorizeUser/login';

type LoginForm = {
  email: string,
  password: string,
};

const LogInContainer = function LogInContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const {
    loading,
  } = useHttp();
  const [form, setForm] = useState<LoginForm>({
    email: '', password: '',
  });

  const authorizationHandler = async (): Promise<void> => {
    try {
      dispatch(loginUser({ ...form }));
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
