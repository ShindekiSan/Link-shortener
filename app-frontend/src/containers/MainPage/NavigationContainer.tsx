import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth.hook';
import Navigation from '../../components/MainPage/Navigation';
import initialState from '../../store/initialState';

const NavigationContainer = function () {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isAuthenticated:boolean = !initialState.user.data;

  const handleLogout = (): void => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <Navigation
      logoutHandler={handleLogout}
      isAuthenticated={isAuthenticated}
      userName={auth.userName}
    />
  );
};

export default NavigationContainer;
