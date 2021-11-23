import React from 'react';
import Logo from '../UI/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook';
import { useState } from 'react';

function SearchLinksPageNavigation ({ searchHandler }) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const { logout } = useAuth()
    const [tag, setTag] = useState('')

    const handleLogout = () => {
        logout()
        navigate('/')
        window.location.reload()
    }

    const searchLinks = evt => {
        if (evt.key === 'Enter') {
            searchHandler(tag);
            setTag('')
        }
    }

    const changeTagHandler = evt => {
        setTag(evt.target.value)
    }

    return (
        <nav className='app-navigation search-navigation'>
            <ul className='app-menu'>
                <Logo logoStyles={'green-logo'} />
            </ul>
            <input 
                className='app-search'
                type='search'
                placeholder='write tag to search'
                value={tag}
                onChange={changeTagHandler}
                onKeyDown={searchLinks}
            />
            {auth.isAuthenticated ? (
                <ul className='app-authorization'>
                    <li>
                        <Link to='/profile' className='username-link '>
                            <p className='authorized-user-name green-user-name'>{auth.userName}</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <button className='button auth-button green-button' onClick={handleLogout}>log out</button>
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className='app-authorization'>
                    <li>
                        <Link to='/login' className='username-link'>
                        <button className='button auth-button green-button'>log in</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/signup'>
                            <button className='button auth-button green-button'>sign up</button>
                        </Link>
                    </li>
                </ul>
            )}
            
        </nav>
    )
}

export default SearchLinksPageNavigation