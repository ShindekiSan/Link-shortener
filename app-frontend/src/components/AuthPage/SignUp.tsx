import React, { ChangeEventHandler, FC } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../UI/Logo';

export interface SignUpProps {
  changeHandler: ChangeEventHandler,
  registerHandler: () => void,
  loading: boolean,
  error: string
}

const SignUp:FC<SignUpProps> = function ({
  changeHandler, registerHandler, loading, error,
}) {
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
        {loading
          ? <p className="auth-fail-message">Loading...</p>
          : <p className="auth-fail-message">{ error }</p>}
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
