import React, { FC } from 'react';
import SearchedLinkInfo from './SearchedLinkInfo';

interface Props {
  links: {
    from: string,
    _id: string,
    clicks: number,
  }[],
  error: string,
}

const SearchedLinksBlock:FC<Props> = function ({ links, error }) {
  return (
    <div>
      {error
        ? (
          <p className="searched-links-error">{error}</p>
        ) : (
          <div className="searched-links-list">
            {links.slice(0).map(
              (link) => <SearchedLinkInfo from={link.from} key={link._id} id={link._id} />,
            )}
          </div>
        )}
    </div>
  );
};

export default SearchedLinksBlock;
