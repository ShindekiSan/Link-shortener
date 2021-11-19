import React from 'react';
import LinkInfo from './LinkInfo';

function LinksBlock ({ linksArray }) {
    return (
        <div className='profile-links-list'>
            {linksArray.slice(0).map(link => {
                return <LinkInfo to={link.to} key={link._id} />
            })}
        </div>
    )
}

export default LinksBlock