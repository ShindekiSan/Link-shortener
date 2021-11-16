import React from 'react';
import { Link } from 'react-router-dom';
import MyBytton from '../MainPage/MyButton';

function LogIn () {
    return (
        <div className='auth-block'>
            <h2 className='auth-title'>Log In</h2>
            <form className='auth-form login-form'>
                <input className='auth-input' type='text' name='email' id='user-email' placeholder='Email address' />
                <input className='auth-input' type='text' name='password' id='user-password' placeholder='Password' />
                <button type='submit' className='button green-button authorize-button'>Create an account</button>
            </form>
            <h3 className='auth-subtitle'>you do not have an account?</h3>
            <Link to='/signup'><MyBytton buttonType='button green-button other-auth-method-button' text='Sign up'/></Link>
        </div>
    )
}

export default LogIn