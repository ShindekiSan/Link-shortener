import React from 'react';
import Loader from '../UI/Loader';
import SearchedLinkCard from './SearchedLinkCard';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';

function SearchedLinkDetails () {
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id

    const getLink = useCallback(async() => {
        try {
            const fetched = await request(`http://localhost:5000/api/link/link-info/${linkId}`, 'GET', null)

            setLink(fetched)

        } catch (e) {
            console.log(e.message)
        }
    }, [linkId, request])
    
    useEffect(() => {
        getLink()
    }, [getLink])

    return (
        <div>
            {!loading && link ? <SearchedLinkCard link={link} /> : <Loader />}
        </div> 
    )
}

export default SearchedLinkDetails
