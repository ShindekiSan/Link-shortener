import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import SignUp from '../../components/AuthPage/SignUp';
import signupUser from '../../store/actions/authorizeUser/signup';
import useTypedSelector from '../../hooks/typedSelector.hook';

type SignupForm = {
  email: string,
  password: string,
  username: string,
};

const SignUpContainer:FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useTypedSelector((state) => state.user);
  const [form, setForm] = useState<SignupForm>({
    username: '', email: '', password: '',
  });

  const registerHandler = (): void => {
    dispatch(signupUser(form));
    navigate('/');
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
