import React from 'react';
import SearchLinksPageHeader from './SearchLinksPageHeader';
import SearchedLinksBlock from './SearchedLinksBlock';
import Loader from '../UI/Loader';
import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';

function SearchLinksPage () {
    const [searchedLinks, setSearchedLinks] = useState([])
    const {request, loading} = useHttp();

    const searchLinks = async (tag) => {
        try {
            const searched = await request(`http://localhost:5000/api/link/search/${tag}`, 'GET', null)
            setSearchedLinks(searched)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div>
            <SearchLinksPageHeader searchHandler={searchLinks} />
            {!loading && searchedLinks ? <SearchedLinksBlock links={searchedLinks} /> : <Loader />}
        </div>
    )
}

export default SearchLinksPage