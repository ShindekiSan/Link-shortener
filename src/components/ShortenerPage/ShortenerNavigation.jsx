import React from 'react';
import Logo from '../MainPage/Logo';
import MyButton from '../MainPage/MyButton';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook';
import { useNavigate, Link } from 'react-router-dom';

function ShortenerNavigation () {
    const auth = useContext(AuthContext)
    const {logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate('/');
        window.location.reload();
    }

    return (
        <nav className='app-navigation shortener-navigation'>
            <ul className='app-menu'>
                <li>
                    <Logo logoStyles={'green-logo'} />
                </li>
            </ul>
            <ul className='app-authorization'>
                <li>
                    <Link to='/profile' className='username-link'>
                        <p className='authorized-user-name green-user-name'>{auth.userName}</p>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <button className='button auth-button green-button' onClick={handleLogout}>log out</button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default ShortenerNavigation