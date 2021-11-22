import React from 'react'
import ProfileNavigation from './ProfileNavigation';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function ProfileHeader () {
    const auth = useContext(AuthContext);

    return (
        <div className='profile-header'>
            <ProfileNavigation />
            <h2 className='profile-title'>Welcome, {auth.userName}!</h2>
            <p className='profile-subtitle'>Your list of shortened links</p>
        </div>
    )
}

export default ProfileHeader