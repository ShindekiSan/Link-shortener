import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProfileNavigation from '../../containers/ProfilePage/ProfileNavigationContainer';

const ProfileHeader = function () {
	const auth = useContext(AuthContext);

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
