import React from 'react';
import Logo from '../MainPage/Logo';
import { Link } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

function SignUp () {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        username:'', email: '', password: ''
    })

    const registerHandler = async () => {
        try {
            if (error) {
                clearError();
            }
            const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form})
            auth.login(data.token, data.userName, data.userId)
            navigate('/')
        } catch (e) {
        }
    }

    const changeHandler = evt => {
        setForm({...form, [evt.target.name]: evt.target.value })
    }

    return (
        <>
            <nav className='auth-logo'>
                <Logo logoStyles={'green-logo'} />
            </nav>
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
                        type='password' 
                        name='password' 
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
                <p className='auth-fail-message'>{ error }</p>
                <h3 className='auth-subtitle'>Do you already have an account?</h3>
                <Link to='/login'>
                    <button 
                        className='button green-button other-auth-method-button' 
                        >
                            Log in
                    </button>
                </Link>
            </div>
        </>
    )
}

export default SignUp