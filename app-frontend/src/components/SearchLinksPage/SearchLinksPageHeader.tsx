import React, { FC } from 'react';
import SearchLinksPageNavigation from '../../containers/SearchLinksPage/SearchLinksPageNavigationContainer';

const SearchLinksPageHeader:FC = function () {
  return (
    <div className="search-header">
      <SearchLinksPageNavigation />
      <h2 className="search-header__title">This is search page</h2>
      <p className="search-header__description">Here you can find links by tag</p>
    </div>
  );
};

export default SearchLinksPageHeader;
