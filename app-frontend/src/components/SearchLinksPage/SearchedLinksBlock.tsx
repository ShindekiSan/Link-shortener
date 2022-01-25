import React, { FC } from 'react';
import SearchedLinkInfo from './SearchedLinkInfo';

interface LinkElement {
  from: string,
  _id: string,
}

interface Props {
  links: LinkElement[],
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
              (link:LinkElement) => (
                <SearchedLinkInfo
                  from={link.from}
                  key={link._id}
                  id={link._id}
                />
              ),
            )}
          </div>
        )}
    </div>
  );
};

export default SearchedLinksBlock;
