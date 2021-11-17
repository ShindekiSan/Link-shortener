import React from 'react';
import { Link } from 'react-router-dom';
import MyBytton from '../MainPage/MyButton';
import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react'

function LogIn () {
    const {loading, request} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const authorizationHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form})
            console.log('Data', data)
        } catch (e) {
            console.log('Error', e.message)
        }
    }

    const changeHandler = evt => {
        setForm({...form, [evt.target.name]: evt.target.value })
    }


    return (
        <div className='auth-block'>
            <h2 className='auth-title'>Log In</h2>
            <div className='auth-form login-form'>
                <input 
                    className='auth-input' 
                    type='text' name='email' 
                    id='user-email' 
                    placeholder='Email address'
                    onChange={changeHandler} />
                <input 
                    className='auth-input' 
                    type='text' 
                    name='password' 
                    id='user-password' 
                    placeholder='Password'
                    onChange={changeHandler} />
                <button 
                    className='button green-button authorize-button' 
                    disabled={loading}
                    onClick={authorizationHandler}
                    >
                        Log in
                </button>
            </div>
            <h3 className='auth-subtitle'>You do not have an account?</h3>
            <Link to='/signup'>
                <MyBytton 
                    buttonType='button green-button other-auth-method-button' 
                    text='Sign up'/>
                </Link>
        </div>
    )
}

export default LogIn