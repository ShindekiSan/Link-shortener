import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import useHttp from '../../hooks/http.hook';
import SignUp from '../../components/AuthPage/SignUp';

import AuthContext from '../../context/AuthContext';

const SignUpContainer = function () {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [error, setError] = useState('');
  const {
    loading, request,
  } = useHttp();
  const [form, setForm] = useState({
    username: '', email: '', password: '',
  });

  const registerHandler = async () => {
    try {
      const data = await request('http://localhost:5000/api/auth/register', 'POST', { ...form });
      auth.login(data.token, data.userId, data.userName);
      navigate('/');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
