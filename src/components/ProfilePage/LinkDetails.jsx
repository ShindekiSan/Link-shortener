import React from 'react';
import Loader from '../UI/Loader';
import LinkCard from './LinkCard';
import { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';

function LinkDetails () {
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState(null)
    const {id} = useParams()
 
    const getLink = useCallback(async() => {
        try {
            const fetched = await request(`http://localhost:5000/api/link/${id}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
    
            setLink(fetched)
    
        } catch (e) {
            console.log(e.message);
        }
    }, [auth.token, id, request])
    
    useEffect(() => {
        getLink();
    }, [getLink])

    return (
        <div>
            {!loading && link ? <LinkCard link={link} /> : <Loader />}
        </div> 
    )
}

export default LinkDetails


