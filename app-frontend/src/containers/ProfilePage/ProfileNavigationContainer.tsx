import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import ProfileNavigation from '../../components/ProfilePage/ProfileNavigation';
import logoutUser from '../../store/actions/authorizeUser/logout';

const ProfileNavigationContainer:FC = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logoutUser);
    navigate('/');
  };

  return (
    <ProfileNavigation logoutHandler={handleLogout} />
  );
};

export default ProfileNavigationContainer;
