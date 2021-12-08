import React, { FC } from 'react';
import SearchedLinkInfo from './SearchedLinkInfo';

interface Props {
	links: {
		from: string,
		_id: string,
		clicks: number,
	}[]
}

const SearchedLinksBlock:FC<Props> = function ({ links }) {
	return (
		<div className="searched-links-list">
			{links.slice(0).map(
				(link) => <SearchedLinkInfo from={link.from} key={link._id} id={link._id} />,
			)}
		</div>
	);
};

export default SearchedLinksBlock;
