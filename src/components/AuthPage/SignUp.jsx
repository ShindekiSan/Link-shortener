import React from 'react';
import Navigation from '../MainPage/Navigation';

function SignUp () {
    return (
        <div className='auth-block'>
            <h2 className='auth-title'>Sign up</h2>
            <form className='auth-form'>
                <input className='auth-input' type='text' name='userName' id='user-name' placeholder='User name' />
                <input className='auth-input' type='text' name='email' id='user-email' placeholder='Email address' />
                <input className='auth-input' type='text' name='password' id='user-password' placeholder='Password' />
                <button type='submit' className='button green-button auth-button'>Create an account</button>
            </form>
        </div>
    )
}

export default SignUp