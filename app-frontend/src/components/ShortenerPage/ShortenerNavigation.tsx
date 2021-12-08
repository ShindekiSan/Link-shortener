import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../UI/Logo';

import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook';

const ShortenerNavigation = function () {
	const auth = useContext(AuthContext);
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
		window.location.reload();
	};

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
						<p className="authorized-user-name green-user-name">{auth.userName}</p>
					</Link>
				</li>
				<li>
					<Link to="/">
						<button className="button auth-button green-button" onClick={handleLogout} type="button">log out</button>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default ShortenerNavigation;
