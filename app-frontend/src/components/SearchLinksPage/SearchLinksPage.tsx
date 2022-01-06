import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import SearchLinksPageHeader from './SearchLinksPageHeader';
import SearchedLinksBlock from './SearchedLinksBlock';
import Loader from '../UI/Loader';
import { RootState } from '../../store/reducers/root';

const SearchLinksPage:FC = function () {
  const { data, loading, error } = useSelector((state: RootState) => state.searchedLinks);

  return (
    <div>
      <SearchLinksPageHeader />
      {!loading && data
        ? <SearchedLinksBlock links={data} error={error} />
        : (
          <div>
            {loading
              ? <Loader /> : <span>{}</span> }
          </div>
        )}
    </div>
  );
};

export default SearchLinksPage;
