import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from '../../components/AuthPage/SignUp';
import signupUser from '../../store/actions/authorizeUser/signup';
import { RootState } from '../../store/reducers/root';

type SignupForm = {
  email: string,
  password: string,
  username: string,
};

const SignUpContainer:FC = function () {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state: RootState) => state.user);
  const [form, setForm] = useState<SignupForm>({
    username: '', email: '', password: '',
  });

  const registerHandler = (): void => {
    dispatch(signupUser(form));
  };

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  return (
    <SignUp
      changeHandler={changeHandler}
      registerHandler={registerHandler}
      loading={loading}
      error={error}
    />
  );
};

export default SignUpContainer;
