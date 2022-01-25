import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../UI/MyButton';
import Logo from '../UI/Logo';

export interface NavProps {
  logoutHandler: () => void,
  isAuthenticated: boolean,
  userName?: string
}

const Navigation:FC<NavProps> = function ({ logoutHandler, isAuthenticated, userName }) {
  return (
    <nav className="app-navigation">
      <ul className="app-menu">
        <li>
          <Logo />
        </li>
        <li>
          <Link to="/search"><button className="button white-button search-button" type="button">search for links</button></Link>
        </li>
      </ul>
      {isAuthenticated ? (
        <ul className="app-authorization">
          <li>
            <Link to="/profile" className="username-link">
              <p className="authorized-user-name">{userName}</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <MyButton buttonType="button auth-button light-blue-button" text="log out" clickFunc={logoutHandler} />
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="app-authorization">
          <li>
            <Link to="/login">
              <MyButton buttonType="button auth-button white-button" text="log in" />
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <MyButton buttonType="button auth-button light-blue-button" text="sign up" />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
