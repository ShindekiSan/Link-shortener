import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../UI/Loader';

import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';
import LinkCard from '../../containers/ProfilePage/LinkCardContainer';

const LinkDetails = function () {
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`http://localhost:5000/api/link/${id}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });

      setLink(fetched);
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
