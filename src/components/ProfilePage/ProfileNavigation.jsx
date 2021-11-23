import React from 'react';
import MyButton from '../UI/MyButton';
import Logo from '../UI/Logo';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.hook';
import { useNavigate } from 'react-router';

function ProfileNavigation () {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/')
        window.location.reload()
    }

    return (
        <nav className='app-navigation profile-navigation'>
            <ul className='app-menu'>
                <li>
                    <Logo logoStyles={'green-logo'} />
                </li>
                <li>
                    <Link to='/search'><button className='button green-button search-button'>search for links</button></Link>
                </li>
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