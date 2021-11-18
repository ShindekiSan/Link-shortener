import React, { useContext } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook';
import MyButton from './MyButton';

function Navigation () {
    const auth = useContext(AuthContext)
    const { logout } = useAuth();
    return (
        <nav className='app-navigation'>
            <ul className='app-menu'>
                <li className='app-logo'>
                    <span>calibri</span>
                </li>
                <li>
                    <AiOutlineMenu className='menu-button' />
                </li>
            </ul>
            {auth.isAuthenticated ? (
                <ul className='app-authorization'>
                    <li>
                        <p className='authorized-user-profile-name'>{auth.userName}</p>
                    </li>
                    <li>
                        <Link to='/'><MyButton buttonType='button auth-button light-blue-button' text='log out' clickFunc={logout} /></Link>
                    </li>
                </ul>
            ) : (
                <ul className='app-authorization'>
                    <li>
                        <Link to='/login'><MyButton buttonType='button auth-button white-button' text='log in' /></Link>
                    </li>
                    <li>
                        <Link to='/signup'><MyButton buttonType='button auth-button light-blue-button' text='sign up' /></Link>
                    </li>
                </ul>
            )}
        </nav>
    )
}

export default Navigation