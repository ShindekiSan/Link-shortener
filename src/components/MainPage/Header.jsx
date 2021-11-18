import React, { useContext } from 'react';
import MyButton from './MyButton';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { AuthContext } from '../../context/AuthContext';

function Header () {
    const auth = useContext(AuthContext)
    return (
        <header className='app-header'>
            <Navigation />
            <div className='app-title'>
                <p className='app-description'>URL Shortener</p>
                <h1 className='main-title'>Make your link as small as calibri.</h1>
                <ul className={auth.isAuthenticated ? 'authorized-user' : 'app-title__authorization'}>
                    <li>
                        <Link to='/signup'><MyButton buttonType='button white-button' text='sign up' /></Link>
                    </li>
                    <li>
                        <Link to='/login'><MyButton buttonType='button light-blue-button' text='log in' /></Link>
                    </li>
                </ul>
            </div>
        </header>
    )
};

export default Header 