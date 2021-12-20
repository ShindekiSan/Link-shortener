import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import AuthContext, { ContextValue } from '../../context/AuthContext';
import useHttp, { RequestPromise } from '../../hooks/http.hook';
import LinksBlock from './LinksBlock';
import ProfileHeader from './ProfileHeader';
import Loader from '../UI/Loader';
import { Link } from '../../types/link';

const Profile = function () {
  const auth: ContextValue = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [links, setLinks] = useState<Link[] | []>([]);
  const [error, setError] = useState<string>('');

  const getLinks = useCallback(async () => {
    try {
      const fetched: RequestPromise = await request('http://localhost:5000/api/link', 'GET', null, {
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
