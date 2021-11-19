import React from 'react'
import { Link } from 'react-router-dom'

function Logo ({ logoStyles }) {
    return (
        <Link to='/' className='logo-link'>
            <li className={`app-logo ${logoStyles}`}>
                <span>calibri</span>
            </li>
        </Link>
    )
}

export default Logo