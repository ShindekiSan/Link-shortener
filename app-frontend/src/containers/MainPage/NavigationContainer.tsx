import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import useTypedSelector from '../../hooks/typedSelector.hook';
import Navigation from '../../components/MainPage/Navigation';

const NavigationContainer:FC = function () {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']); // eslint-disable-line
  const { data } = useTypedSelector((state) => state.user);

  const handleLogout = (): void => {
    removeCookie('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <Navigation
      logoutHandler={handleLogout}
      isAuthenticated={!!data.userName}
      userName={data.userName}
    />
  );
};

export default NavigationContainer;
