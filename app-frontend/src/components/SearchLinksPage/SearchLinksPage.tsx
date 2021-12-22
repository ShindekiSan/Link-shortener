import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchLinksPageHeader from './SearchLinksPageHeader';
import SearchedLinksBlock from './SearchedLinksBlock';
import Loader from '../UI/Loader';
import useTypedSelector from '../../hooks/typedSelector.hook';
import loadSearchedLinksData from '../../store/actions/loadSearchedLinksData/loadSearchedLinksData';

const SearchLinksPage:FC = function () {
  const { data, loading } = useTypedSelector((state) => state.searchedLinks);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const searchLinks = async (tag: string) => {
    try {
      dispatch(loadSearchedLinksData(tag));
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
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
