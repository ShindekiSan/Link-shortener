import React from 'react'
import { Link } from 'react-router-dom'

function Logo ({ logoStyles }) {
    return (
        <Link to='/' className='logo-link'>
            <div className={`app-logo ${logoStyles}`}>
                <span>calibri</span>
            </div>
        </Link>
    )
}

export default Logo