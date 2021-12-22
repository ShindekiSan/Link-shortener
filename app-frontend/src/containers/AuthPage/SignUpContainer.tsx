import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/http.hook';
import SignUp from '../../components/AuthPage/SignUp';
import signupUser from '../../store/actions/authorizeUser/signup';

type SignupForm = {
  email: string,
  password: string,
  username: string,
};

const SignUpContainer:FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    loading,
  } = useHttp();
  const [form, setForm] = useState<SignupForm>({
    username: '', email: '', password: '',
  });

  const registerHandler = async (): Promise<void> => {
    try {
      dispatch(signupUser(form));
      navigate('/');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
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
