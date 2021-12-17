import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';
import LinksBlock from './LinksBlock';
import ProfileHeader from './ProfileHeader';
import Loader from '../UI/Loader';
import { Link } from '../../types/link';

const Profile = function () {
  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [links, setLinks] = useState<Link[] | []>([]);
  const [error, setError] = useState('');

  const getLinks = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:5000/api/link', 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setLinks(fetched.links);
    } catch (e: any) {
      setError(e.message);
    }
  }, [request, auth.token]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  return (
    <div>
      <ProfileHeader />
      { !loading && links ? <LinksBlock linksArray={links} error={error} /> : <Loader /> }
    </div>
  );
};

export default Profile;
