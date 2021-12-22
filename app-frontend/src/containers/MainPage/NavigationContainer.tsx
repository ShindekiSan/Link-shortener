import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypedSelector from '../../hooks/typedSelector.hook';
// import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth.hook';
import Navigation from '../../components/MainPage/Navigation';

const NavigationContainer:FC = function () {
  // const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data } = useTypedSelector((state) => state.user);

  const handleLogout = (): void => {
    logout();
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
