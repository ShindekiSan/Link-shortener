import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/auth.hook';
import Navigation from '../../components/MainPage/Navigation';

const NavigationContainer = function () {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate('/');
		window.location.reload();
	};

	return (
		<Navigation logoutHandler={handleLogout} isAuthenticated={auth.isAuthenticated} userName={auth.userName} />
	);
};

export default NavigationContainer;
