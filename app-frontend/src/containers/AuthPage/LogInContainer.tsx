import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogIn from '../../components/AuthPage/LogIn';
import loginUser from '../../store/actions/authorizeUser/login';
import { RootState } from '../../store/reducers/root';

type LoginForm = {
  email: string,
  password: string,
};

const LogInContainer:FC = function LogInContainer() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state: RootState) => state.user);
  const [form, setForm] = useState<LoginForm>({
    email: '', password: '',
  });

  const authorizationHandler = (): void => {
    dispatch(loginUser(form));
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
