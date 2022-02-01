import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MyButton from '../UI/MyButton';
import Navigation from '../../containers/MainPage/NavigationContainer';
import { RootState } from '../../store/reducers/root';

const Header:FC = function () {
  const { data } = useSelector((state: RootState) => state.user);
  return (
    <header className="app-header">
      <Navigation />
      <div className="app-title">
        <p className="app-description">URL Shortener</p>
        <h1 className="main-title">Make your link as small as calibri.</h1>
        {data?.data?.userName
          ? (
            <ul className="app-title__button-links">
              <li>
                <Link to="/shortener"><MyButton buttonType="button white-button" text="start" /></Link>
              </li>
            </ul>
          ) : (
            <ul className="app-title__button-links">
              <li>
                <Link to="/signup"><MyButton buttonType="button white-button" text="sign up" /></Link>
              </li>
              <li>
                <Link to="/login"><MyButton buttonType="button light-blue-button" text="log in" /></Link>
              </li>
            </ul>
          )}
      </div>
    </header>
  );
};

export default Header;
