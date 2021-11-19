import React from 'react';
import MyButton from '../MainPage/MyButton';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hook';
import { useNavigate } from 'react-router';

function ProfileNavigation () {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        window.location.reload();
    }

    return (
        <nav className='app-navigation profile-navigation'>
            <ul className='app-menu'>
                <Link to='/' className='logo-link'>
                    <li className='app-logo profile-logo'>
                        <span>calibri</span>
                    </li>
                </Link>
            </ul>
            <ul className='app-authorization profile-logout'>
                <li>
                    <Link to='/'><MyButton buttonType='button auth-button green-button' text='log out' clickFunc={handleLogout} /></Link>
                </li>
            </ul>
        </nav>
    )
}

export default ProfileNavigation