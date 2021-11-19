import React from 'react';
import LinkInfo from './LinkInfo';
import ClicksAmount from './ClicksAmount';

function LinksBlock ({ linksArray }) {

    return (
        <div className='profile-links-list'>
            <ClicksAmount links={linksArray} />
            {linksArray.slice(0).map(link => {
                return <LinkInfo to={link.to} key={link._id} id={link._id} />
            })}
        </div>
    )
}

export default LinksBlock