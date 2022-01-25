import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../UI/Logo';

interface NavProps {
  logoutHandler: () => void,
  userName?: string
}

const ShortenerNavigation:FC<NavProps> = function ({ logoutHandler, userName }) {
  return (
    <nav className="app-navigation shortener-navigation">
      <ul className="app-menu">
        <li>
          <Logo logoStyles="green-logo" />
        </li>
        <Link to="/search"><button className="button green-button search-button" type="button">search for links</button></Link>
      </ul>
      <ul className="app-authorization">
        <li>
          <Link to="/profile" className="username-link">
            <p className="authorized-user-name green-user-name">{userName}</p>
          </Link>
        </li>
        <li>
          <Link to="/">
            <button className="button auth-button green-button" onClick={logoutHandler} type="button">log out</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ShortenerNavigation;
