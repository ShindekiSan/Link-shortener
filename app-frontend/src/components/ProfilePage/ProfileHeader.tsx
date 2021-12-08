import React, { useContext } from 'react';
import ProfileNavigation from './ProfileNavigation';

import { AuthContext } from '../../context/AuthContext';

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
