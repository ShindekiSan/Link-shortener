import React, { FC } from 'react';
import SearchLinksPageNavigation from './SearchLinksPageNavigation';

interface FuncProps {
	searchHandler: (tag: string) => Promise<void> // eslint-disable-line
}

const SearchLinksPageHeader:FC<FuncProps> = function ({ searchHandler }) {
	return (
		<div className="search-header">
			<SearchLinksPageNavigation searchHandler={searchHandler} />
			<h2 className="search-header__title">This is search page</h2>
			<p className="search-header__description">Here you can find links by tag</p>
		</div>
	);
};

export default SearchLinksPageHeader;
