import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/auth.hook';
import ProfileNavigation from '../../components/ProfilePage/ProfileNavigation';

const ProfileNavigationContainer:FC = function () {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <ProfileNavigation logoutHandler={handleLogout} />
  );
};

export default ProfileNavigationContainer;
