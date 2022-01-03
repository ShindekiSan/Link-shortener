import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogIn from '../../components/AuthPage/LogIn/LogIn';
import loginUser from '../../store/actions/authorizeUser/login';
import useTypedSelector from '../../hooks/typedSelector.hook';

type LoginForm = {
  email: string,
  password: string,
};

const LogInContainer:FC = function LogInContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useTypedSelector((state) => state.user);
  const [form, setForm] = useState<LoginForm>({
    email: '', password: '',
  });

  const authorizationHandler = (): void => {
    dispatch(loginUser(form));
    navigate('/');
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
