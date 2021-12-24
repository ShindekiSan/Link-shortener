import React, { FC } from 'react';
import ProfileNavigation from '../../containers/ProfilePage/ProfileNavigationContainer';
import useTypedSelector from '../../hooks/typedSelector.hook';

const ProfileHeader:FC = function () {
  const { data } = useTypedSelector((state) => state.user);

  return (
    <div className="profile-header">
      <ProfileNavigation />
      <h2 className="profile-title">
        Welcome,
        {data.data?.userName}
        !
      </h2>
      <p className="profile-subtitle">Your list of shortened links</p>
    </div>
  );
};

export default ProfileHeader;
