import React, { useContext, useState, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../UI/Logo';

import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook';

interface FuncProps {
	searchHandler: (tag: string) => Promise<void> // eslint-disable-line
}

const SearchLinksPageNavigation:FC<FuncProps> = function ({ searchHandler }) {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [tag, setTag] = useState('');

	const handleLogout = () => {
		logout();
		navigate('/');
		window.location.reload();
	};

	const searchLinks = (evt: React.KeyboardEvent) => {
		if (evt.key === 'Enter') {
			searchHandler(tag);
			setTag('');
		}
	};

	const changeTagHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setTag(evt.target.value);
	};

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
				onKeyDown={searchLinks}
			/>
			{auth.isAuthenticated ? (
				<ul className="app-authorization">
					<li>
						<Link to="/profile" className="username-link ">
							<p className="authorized-user-name green-user-name">{auth.userName}</p>
						</Link>
					</li>
					<li>
						<Link to="/">
							<button className="button auth-button green-button" onClick={handleLogout} type="button">log out</button>
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
