import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../UI/Loader';

import AuthContext, { ContextValue } from '../../context/AuthContext';
import useHttp, { RequestPromise } from '../../hooks/http.hook';
import LinkCard from '../../containers/ProfilePage/LinkCardContainer';
import { Link } from '../../types/link';

const LinkDetails = function () {
  const { request, loading } = useHttp();
  const auth: ContextValue = useContext(AuthContext);
  const [link, setLink] = useState<Link | null>(null);
  const [error, setError] = useState<string>('');
  const { id } = useParams();

  const getLink = useCallback(async () => {
    try {
      const fetched: RequestPromise = await request(`http://localhost:5000/api/link/${id}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });

      setLink(fetched.link);
    } catch (e: any) {
      setError(e.message);
    }
  }, [auth.token, id, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <div>
      {!loading && link ? <LinkCard link={link} error={error} /> : <Loader />}
    </div>
  );
};

export default LinkDetails;
