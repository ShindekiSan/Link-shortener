import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ProfileNavigation from '../../components/ProfilePage/ProfileNavigation';

const ProfileNavigationContainer:FC = function () {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']); // eslint-disable-line

  const handleLogout = (): void => {
    removeCookie('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <ProfileNavigation logoutHandler={handleLogout} />
  );
};

export default ProfileNavigationContainer;
