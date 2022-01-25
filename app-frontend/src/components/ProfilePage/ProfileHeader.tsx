import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import ProfileNavigation from '../../containers/ProfilePage/ProfileNavigationContainer';
import { RootState } from '../../store/reducers/root';

const ProfileHeader:FC = function () {
  const { data } = useSelector((state: RootState) => state.user);

  return (
    <div className="profile-header">
      <ProfileNavigation />
      <h2 className="profile-title">
        Welcome,
        {data?.data?.userName}
        !
      </h2>
      <p className="profile-subtitle">Your list of shortened links</p>
    </div>
  );
};

export default ProfileHeader;
