import React, {
  useEffect, useCallback, FC,
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../UI/Loader';
import SearchedLinkCard from './SearchedLinkCard';
import loadSearchedLinkData from '../../store/actions/loadSearchedLinkData/loadSearchedLinkData';
import { RootState } from '../../store/reducers/root';

const SearchedLinkDetails:FC = function () {
  const { data, loading, error } = useSelector((state: RootState) => state.searchedLink);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const getLink = useCallback(() => {
    dispatch(loadSearchedLinkData(id));
  }, [id]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <div>
      {!loading && data?.data ? <SearchedLinkCard link={data.data} error={error} /> : <Loader />}
    </div>
  );
};

export default SearchedLinkDetails;
