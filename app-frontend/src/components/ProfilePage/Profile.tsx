import React, {
	useCallback, useContext, useEffect, useState,
} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import LinksBlock from './LinksBlock';
import ProfileHeader from './ProfileHeader';
import Loader from '../UI/Loader';

const Profile = function () {
	const auth = useContext(AuthContext);
	const { request, loading } = useHttp();
	const [links, setLinks] = useState([]);

	const getLinks = useCallback(async () => {
		try {
			const fetched = await request('http://localhost:5000/api/link', 'GET', null, {
				Authorization: `Bearer ${auth.token}`,
			});
			setLinks(fetched)
		} catch (e: any) {
			console.log(e.message);
		}
	}, [request, auth.token]);

	useEffect(() => {
		getLinks();
	}, [getLinks]);

	return (
		<div>
			<ProfileHeader />
			{ !loading && links ? <LinksBlock linksArray={links} /> : <Loader /> }
		</div>
	);
};

export default Profile;