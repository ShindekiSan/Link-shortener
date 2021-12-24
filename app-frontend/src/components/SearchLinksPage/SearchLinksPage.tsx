import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import SearchLinksPageHeader from './SearchLinksPageHeader';
import SearchedLinksBlock from './SearchedLinksBlock';
import Loader from '../UI/Loader';
import useTypedSelector from '../../hooks/typedSelector.hook';
import loadSearchedLinksData from '../../store/actions/loadSearchedLinksData/loadSearchedLinksData';

const SearchLinksPage:FC = function () {
  const { data, loading, error } = useTypedSelector((state) => state.searchedLinks);
  const dispatch = useDispatch();

  const searchLinks = (tag: string) => {
    dispatch(loadSearchedLinksData(tag));
  };

  return (
    <div>
      <SearchLinksPageHeader searchHandler={searchLinks} />
      {!loading && data
        ? <SearchedLinksBlock links={data} error={error} /> : <Loader />}
    </div>
  );
};

export default SearchLinksPage;
