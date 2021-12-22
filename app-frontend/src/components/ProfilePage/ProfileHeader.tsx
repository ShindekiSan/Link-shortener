import React, { FC, useContext } from 'react';
import AuthContext, { ContextValue } from '../../context/AuthContext';
import ProfileNavigation from '../../containers/ProfilePage/ProfileNavigationContainer';

const ProfileHeader:FC = function () {
  const auth: ContextValue = useContext(AuthContext);

  return (
    <div className="profile-header">
      <ProfileNavigation />
      <h2 className="profile-title">
        Welcome,
        {auth.userName}
        !
      </h2>
      <p className="profile-subtitle">Your list of shortened links</p>
    </div>
  );
};

export default ProfileHeader;
