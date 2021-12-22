import React, {
  useState, useEffect, useCallback, FC,
} from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../UI/Loader';
import SearchedLinkCard from './SearchedLinkCard';
import { Link } from '../../types/link';

import useHttp, { RequestPromise } from '../../hooks/http.hook';

const SearchedLinkDetails:FC = function () {
  const { request, loading } = useHttp();
  const [link, setLink] = useState<Link | null>(null);
  const [error, setError] = useState<string>('');
  const { id } = useParams();

  const getLink = useCallback(async () => {
    try {
      const fetched: RequestPromise = await request(`http://localhost:5000/api/link/link-info/${id}`, 'GET', null);

      setLink(fetched.link);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
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
