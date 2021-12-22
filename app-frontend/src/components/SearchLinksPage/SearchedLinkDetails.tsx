import React, {
  useState, useEffect, useCallback, FC,
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../UI/Loader';
import SearchedLinkCard from './SearchedLinkCard';
import useTypedSelector from '../../hooks/typedSelector.hook';
import loadSearchedLinkData from '../../store/actions/loadSearchedLinkData/loadSearchedLinkData';

const SearchedLinkDetails:FC = function () {
  const [error, setError] = useState<string>('');
  const { data, loading } = useTypedSelector((state) => state.searchedLink);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getLink = useCallback(async () => {
    try {
      dispatch(loadSearchedLinkData(id));
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [id]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <div>
      {!loading && data ? <SearchedLinkCard link={data} error={error} /> : <Loader />}
    </div>
  );
};

export default SearchedLinkDetails;
