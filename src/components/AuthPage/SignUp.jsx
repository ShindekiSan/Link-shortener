import React from 'react';
import { Link } from 'react-router-dom';
import MyBytton from '../MainPage/MyButton';

function SignUp () {
    return (
        <div className='auth-block'>
            <h2 className='auth-title'>Sign up</h2>
            <form className='auth-form'>
                <input className='auth-input' type='text' name='userName' id='user-name' placeholder='User name' />
                <input className='auth-input' type='text' name='email' id='user-email' placeholder='Email address' />
                <input className='auth-input' type='text' name='password' id='user-password' placeholder='Password' />
                <button type='submit' className='button green-button authorize-button'>Create an account</button>
            </form>
            <h3 className='auth-subtitle'>Do you already have an account?</h3>
            <Link to='/login'><MyBytton buttonType='button green-button other-auth-method-button' text='Log in'/></Link>
        </div>
    )
}

export default SignUp