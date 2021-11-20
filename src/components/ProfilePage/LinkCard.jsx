import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function LinkCard ({ link }) {
    const [linkDate, setLinkDate] = useState('')
    
    const formatDate = () => {
        const date = new Date(link.date)
        setLinkDate(date.toLocaleDateString())
    }

    useEffect(() => {
        formatDate();
    }, [formatDate])

    return (
        <div className='link-card'>
            <Link to='/profile'><button className='button green-button back-button'>Back</button></Link>
            <h3 className='link-card-title'>Your link</h3>
            <p>code: {link.code}</p>
            <p>to: <a href={link.to} target='_blank' rel='noopener noreferrer'>{link.to}</a></p>
            <p>from: <a href={link.from} target='_blank' rel='noopener noreferrer'>{link.from}</a></p>
            <p>number of clicks: {link.clicks}</p>
            <p>tags: {link.tags}</p>
            <p>date of creating: {linkDate}</p>
        </div>
    )
}

export default LinkCard