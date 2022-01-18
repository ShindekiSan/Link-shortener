import React, { ChangeEventHandler, FC } from 'react';
import { Link } from 'react-router-dom';
import MyBytton from '../UI/MyButton';
import Logo from '../UI/Logo';

export interface LogInProps {
  changeHandler: ChangeEventHandler,
  authorizationHandler: () => void,
  loading: boolean,
  error: string,
}

const LogIn:FC<LogInProps> = function ({
  changeHandler, authorizationHandler, loading, error,
}) {
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
        {loading
          ? <p className="auth-fail-message">Loading...</p>
          : <p className="auth-fail-message">{ error }</p>}
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
