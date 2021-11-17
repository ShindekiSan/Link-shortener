import React from 'react';
import { Link } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react'

function SignUp () {
    const {loading, request} = useHttp()
    const [form, setForm] = useState({
        username:'', email: '', password: ''
    })

    const registerHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form})
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
            <h2 className='auth-title'>Sign up</h2>
            <div className='auth-form'>
                <input 
                    className='auth-input' 
                    type='text' name='username' 
                    id='user-name' 
                    placeholder='User name' 
                    onChange={changeHandler}
                />
                <input 
                    className='auth-input'
                    type='text' 
                    name='email' 
                    id='user-email' 
                    placeholder='Email address' 
                    onChange={changeHandler}
                />
                <input 
                    className='auth-input' 
                    type='text' name='password' 
                    id='user-password' 
                    placeholder='Password' 
                    onChange={changeHandler}
                />
                <button 
                    className='button green-button authorize-button'
                    disabled={loading}
                    onClick={registerHandler}
                    >
                        Create an account
                </button>
            </div>
            <h3 className='auth-subtitle'>Do you already have an account?</h3>
            <Link to='/login'>
                <button 
                    className='button green-button other-auth-method-button' 
                    >
                        Log in
                </button>
            </Link>
        </div>
    )
}

export default SignUp