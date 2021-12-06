import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Logo from '../UI/Logo';
import { useHttp } from '../../hooks/http.hook';

import { AuthContext } from '../../context/AuthContext';

const SignUp = function () {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const {
		loading, request, error, clearError,
	} = useHttp();
	const [form, setForm] = useState({
		username: '', email: '', password: '',
	});

	const registerHandler = async () => {
		try {
			if (error) {
				clearError();
			}
			const data = await request('http://localhost:5000/api/auth/register', 'POST', { ...form });
			auth.login(data.token, data.userId, data.userName);
			navigate('/');
		} catch (e: any) {
			console.log('Error', e.message);
		}
	};

	const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [evt.target.name]: evt.target.value });
	};

	return (
		<>
			<nav className="auth-logo">
				<Logo logoStyles="green-logo" />
			</nav>
			<div className="auth-block">
				<h2 className="auth-title">Sign up</h2>
				<div className="auth-form">
					<input
						className="auth-input"
						type="text"
						name="username"
						id="user-name"
						placeholder="User name"
						onChange={changeHandler}
					/>
					<input
						className="auth-input"
						type="text"
						name="email"
						id="user-email"
						placeholder="Email address"
						onChange={changeHandler}
					/>
					<input
						className="auth-input"
						type="password"
						name="password"
						id="user-password"
						placeholder="Password"
						onChange={changeHandler}
					/>
					<button
						className="button green-button authorize-button"
						disabled={loading}
						onClick={registerHandler}
						type="button"
					>
						Create an account
					</button>
				</div>
				<p className="auth-fail-message">{ error }</p>
				<h3 className="auth-subtitle">Do you already have an account?</h3>
				<Link to="/login">
					<button className="button green-button other-auth-method-button" type="button">
						Log in
					</button>
				</Link>
			</div>
		</>
	);
};

export default SignUp;
