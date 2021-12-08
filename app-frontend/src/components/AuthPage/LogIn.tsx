import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyBytton from '../UI/MyButton';
import Logo from '../UI/Logo';
import { useHttp } from '../../hooks/http.hook';

import { AuthContext } from '../../context/AuthContext';

const LogIn = function LogIn() {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const {
		loading, request, error, clearError,
	} = useHttp();
	const [form, setForm] = useState({
		email: '', password: '',
	});

	const authorizationHandler = async () => {
		try {
			if (error) {
				clearError();
			}
			const data = await request('http://localhost:5000/api/auth/login', 'POST', { ...form });
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
				<h2 className="auth-title">Log In</h2>
				<div className="auth-form login-form">
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
						onClick={authorizationHandler}
						type="button"
					>
						Log in
					</button>
				</div>
				<p className="auth-fail-message">{ error }</p>
				<h3 className="auth-subtitle">You do not have an account?</h3>
				<Link to="/signup">
					<MyBytton
						buttonType="button green-button other-auth-method-button"
						text="Sign up"
					/>
				</Link>
			</div>
		</>
	);
};

export default LogIn;
