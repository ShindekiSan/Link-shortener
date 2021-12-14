import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../UI/Loader';
import SearchedLinkCard from './SearchedLinkCard';

import useHttp from '../../hooks/http.hook';

const SearchedLinkDetails = function () {
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`http://localhost:5000/api/link/link-info/${id}`, 'GET', null);

      setLink(fetched);
    } catch (e: any) {
      setError(e.message);
    }
  }, [id, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <div>
      {!loading && link ? <SearchedLinkCard link={link} error={error} /> : <Loader />}
    </div>
  );
};

export default SearchedLinkDetails;
