import React, { useContext, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook';
import SearchLinksPageNavigation from '../../components/SearchLinksPage/SearchLinksPageNavigation';

interface FuncProps {
	searchHandler: (tag: string) => Promise<void> // eslint-disable-line
}

const SearchLinksPageNavigationContainer:FC<FuncProps> = function ({ searchHandler }) {
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
		<SearchLinksPageNavigation 
			searchHandler={searchLinks} 
			changeTagHandler={changeTagHandler} 
			isAuthenticated={auth.isAuthenticated} 
			userName={auth.userName} 
			logoutHandler={handleLogout}  
			tag={tag}
		/>
	);
};

export default SearchLinksPageNavigationContainer;