import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  logoStyles?: string,
}

const Logo:FC<LogoProps> = function ({ logoStyles }) {
  return (
    <Link to="/" className="logo-link">
      <div className={`app-logo ${logoStyles}`}>
        <span>calibri</span>
      </div>
    </Link>
  );
};

export default Logo;
