import React, { ChangeEventHandler, FC, KeyboardEventHandler } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../UI/Logo';

interface FuncProps {
  searchHandler: KeyboardEventHandler,
  changeTagHandler: ChangeEventHandler,
  isAuthenticated: boolean,
  tag: string,
  logoutHandler: () => void,
  userName?: string
}

const SearchLinksPageNavigation:FC<FuncProps> = function ({
  searchHandler, changeTagHandler, isAuthenticated, tag, logoutHandler, userName,
}) {
  return (
    <nav className="app-navigation search-navigation">
      <ul className="app-menu">
        <Logo logoStyles="green-logo" />
      </ul>
      <input
        className="app-search"
        type="search"
        placeholder="write tag to search"
        value={tag}
        onChange={changeTagHandler}
        onKeyDown={searchHandler}
      />
      {isAuthenticated ? (
        <ul className="app-authorization">
          <li>
            <Link to="/profile" className="username-link ">
              <p className="authorized-user-name green-user-name">{userName}</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="button auth-button green-button" onClick={logoutHandler} type="button">log out</button>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="app-authorization">
          <li>
            <Link to="/login" className="username-link">
              <button className="button auth-button green-button" type="button">log in</button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <button className="button auth-button green-button" type="button">sign up</button>
            </Link>
          </li>
        </ul>
      )}

    </nav>
  );
};

export default SearchLinksPageNavigation;
