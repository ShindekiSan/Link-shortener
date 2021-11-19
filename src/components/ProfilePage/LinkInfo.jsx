import React from 'react'

function LinkInfo ({ to }) {
    return (
        <div className='profile-link-block'>
            <h3 className='profile-link-title'>Link</h3>
            <p className='profile-link-your-link'>Your link: <a href={to}>{to}</a></p>
            <p className='profile-link-more'>Click to see more info</p>
        </div>
    )
}

export default LinkInfo