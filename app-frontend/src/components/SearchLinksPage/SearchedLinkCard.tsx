import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Tag {
  tagName: string,
}

interface LinkProps {
  link: {
    to: string,
    from: string,
    tags: Tag[],
    description: string
  },
  error: string,
}

const SearchedLinkCard:FC<LinkProps> = function ({ link, error }) {
  return (
    <div className="link-card">
      <Link to="/search"><button className="button green-button back-button" type="button">Back</button></Link>
      {error
        ? (
          <h3 className="link-card-title">{error}</h3>
        ) : (
          <div>
            <h3 className="link-card-title">Link info</h3>
            <p>
              to:
              <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
            </p>
            <p>
              from:
              <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
            </p>
            <p>
              tags:
              {link.tags ? link.tags.slice(0).map(((tag:Tag) => `${tag.tagName} `)) : 'Loading....'}
            </p>
            <p>
              description:
              {link.description}
            </p>
          </div>
        )}
    </div>
  );
};

export default SearchedLinkCard;
