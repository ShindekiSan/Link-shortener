import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook';
import MyButton from '../UI/MyButton';
import Logo from '../UI/Logo';

function Navigation () {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/')
        window.location.reload()
    }

    return (
        <nav className='app-navigation'>
            <ul className='app-menu'>
                <li>
                    <Logo />
                </li>
                <li>
                    <Link to='/search'><button className='button white-button search-button'>search for links</button></Link>
                </li> 
            </ul>
            {auth.isAuthenticated ? (
                <ul className='app-authorization'>
                    <li>
                        <Link to='/profile' className='username-link'>
                            <p className='authorized-user-name'>{auth.userName}</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <MyButton buttonType='button auth-button light-blue-button' text='log out' clickFunc={handleLogout} />
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className='app-authorization'>
                    <li>
                        <Link to='/login'>
                            <MyButton buttonType='button auth-button white-button' text='log in' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/signup'>
                            <MyButton buttonType='button auth-button light-blue-button' text='sign up' />
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    )
}

export default Navigation