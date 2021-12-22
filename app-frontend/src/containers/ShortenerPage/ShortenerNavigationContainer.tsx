import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth.hook';
import ShortenerNavigation from '../../components/ShortenerPage/ShortenerNavigation';

const ShortenerNavigationContainer:FC = function () {
  const auth = useContext(AuthContext);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <ShortenerNavigation logoutHandler={handleLogout} userName={auth.userName} />
  );
};

export default ShortenerNavigationContainer;
