import React, { useEffect, useState, useCallback } from 'react'

function ClicksAmount ({ links }) {
    const [clicks, setClicks] = useState(0);

    const getClicksNumber = useCallback(() => {
        setClicks(links.slice(0).reduce((total, link) => {
            return total + link.clicks
        }, 0))
    }, [links])

    useEffect(() => {
        getClicksNumber()
    }, [getClicksNumber])

    return (
        <p className='profile-links-clicks-amount'>Amount of clicks on all your links is: {clicks}</p>
    )
}

export default ClicksAmount