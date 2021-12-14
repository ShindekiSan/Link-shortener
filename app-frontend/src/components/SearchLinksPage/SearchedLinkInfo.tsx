import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface LinkInfoProps {
  from: string,
  id: string,
}

const SearchedLinkInfo:FC<LinkInfoProps> = function ({ from, id }) {
  return (
    <Link to={`/link-info/${id}`} className="profile-link-block">
      <div className="profile-link-info">
        <h3 className="profile-link-title">Link</h3>
        <p className="profile-link-your-link">
          Link address:
          <span>{from}</span>
        </p>
        <p className="profile-link-more">Click to see more info</p>
      </div>
    </Link>
  );
};

export default SearchedLinkInfo;
