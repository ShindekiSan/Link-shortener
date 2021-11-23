import React from 'react';
import { Link } from 'react-router-dom';

function SearchedLinkCard({ link }) {
    return (
        <div className='link-card'>
            <Link to='/search'><button className='button green-button back-button'>Back</button></Link>
            <h3 className='link-card-title'>Link info</h3>
            <p>to: <a href={link.to} target='_blank' rel='noopener noreferrer'>{link.to}</a></p>
            <p>from: <a href={link.from} target='_blank' rel='noopener noreferrer'>{link.from}</a></p>
            <p>tags: {link.tags.slice(0).map((tag => {
                return tag.tagName + ' '
            }))}</p>
            <p>description: {link.description}</p>
        </div>
    )
}

export default SearchedLinkCard