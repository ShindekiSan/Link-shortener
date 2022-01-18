import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import ProfileNavigation from '../../components/ProfilePage/ProfileNavigation';
import logoutUser from '../../store/actions/authorizeUser/logout';

const ProfileNavigationContainer:FC = function () {
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logoutUser());
  };

  return (
    <ProfileNavigation logoutHandler={handleLogout} />
  );
};

export default ProfileNavigationContainer;
