import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useTypedSelector from '../../hooks/typedSelector.hook';
import Navigation from '../../components/MainPage/Navigation';
import logoutUser from '../../store/actions/authorizeUser/logout';

const NavigationContainer:FC = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useTypedSelector((state) => state.user);

  const handleLogout = (): void => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Navigation
      logoutHandler={handleLogout}
      isAuthenticated={!!data.data?.userName}
      userName={data.data?.userName}
    />
  );
};

export default NavigationContainer;
