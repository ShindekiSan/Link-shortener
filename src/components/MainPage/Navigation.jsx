import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MyButton from './MyButton';

function Navigation () {
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
            <ul className='app-authorization'>
                <li>
                    <MyButton buttonType='button auth-button white-button' text='log in' />
                </li>
                <li>
                    <MyButton buttonType='button auth-button light-blue-button' text='sign up' />
                </li>
            </ul>
        </nav>
    )
}

export default Navigation