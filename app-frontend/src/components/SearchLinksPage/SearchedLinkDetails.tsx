import React, {
  useEffect, useCallback, FC,
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../UI/Loader';
import SearchedLinkCard from './SearchedLinkCard';
import useTypedSelector from '../../hooks/typedSelector.hook';
import loadSearchedLinkData from '../../store/actions/loadSearchedLinkData/loadSearchedLinkData';

const SearchedLinkDetails:FC = function () {
  const { data, loading, error } = useTypedSelector((state) => state.searchedLink);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getLink = useCallback(() => {
    dispatch(loadSearchedLinkData(id));
  }, [id]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <div>
      {!loading && data.data ? <SearchedLinkCard link={data.data} error={error} /> : <Loader />}
    </div>
  );
};

export default SearchedLinkDetails;
