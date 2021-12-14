import React, { FC } from 'react';
import LinkInfo from './LinkInfo';
import ClicksAmount from './ClicksAmount';

interface Props {
  linksArray: {
    from: string,
    _id: string,
    clicks: number,
  }[],
  error: string,
}

const LinksBlock:FC<Props> = function ({ linksArray, error }) {
  return (
    <div>
      {error
        ? (
          <p className="searched-links-error">{error}</p>
        ) : (
          <div className="profile-links-list">
            <ClicksAmount links={linksArray} />
            {linksArray.slice(0).map(
              (link) => <LinkInfo from={link.from} key={link._id} id={link._id} />,
            )}
          </div>
        )}
    </div>
  );
};

export default LinksBlock;
