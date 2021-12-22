import React, { useState } from 'react';
import SearchLinksPageHeader from './SearchLinksPageHeader';
import SearchedLinksBlock from './SearchedLinksBlock';
import Loader from '../UI/Loader';
import { SearchedLinks } from '../../types/link';

import useHttp, { RequestPromise } from '../../hooks/http.hook';

const SearchLinksPage = function () {
  const [searchedLinks, setSearchedLinks] = useState<SearchedLinks[] | []>([]);
  const { request, loading } = useHttp();
  const [error, setError] = useState<string>('');

  const searchLinks = async (tag: string) => {
    try {
      const searched: RequestPromise = await request(`http://localhost:5000/api/link/search/${tag}`, 'GET', null);
      setSearchedLinks(searched.links);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div>
      <SearchLinksPageHeader searchHandler={searchLinks} />
      {!loading && searchedLinks
        ? <SearchedLinksBlock links={searchedLinks} error={error} /> : <Loader />}
    </div>
  );
};

export default SearchLinksPage;
