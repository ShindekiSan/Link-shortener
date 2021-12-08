import React, { FC } from 'react';
import LinkInfo from './LinkInfo';
import ClicksAmount from './ClicksAmount';

interface Props {
	linksArray: {
		from: string,
		_id: string,
		clicks: number,
	}[]
}

const LinksBlock:FC<Props> = function ({ linksArray }) {
	return (
		<div className="profile-links-list">
			<ClicksAmount links={linksArray} />
			{linksArray.slice(0).map(
				(link) => <LinkInfo from={link.from} key={link._id} id={link._id} />,
			)}
		</div>
	);
};

export default LinksBlock;
