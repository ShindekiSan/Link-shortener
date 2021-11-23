import React from 'react';
import SearchedLinkInfo from './SearchedLinkInfo';

function SearchedLinksBlock ({ links }) {
    return (
        <div className='searched-links-list'>
            {links.slice(0).map(link => {
                return <SearchedLinkInfo from={link.from} key={link._id} id={link._id} />
            })}
        </div>
    )
}

export default SearchedLinksBlock