import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext }from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { useParams } from 'react-router-dom';


function LinkCard ({ link }) {
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const linkId = useParams().id
    const [linkInfo, setLinkInfo] = useState(link)
    const [upload, setUpload] = useState('confirm')
    const [linkDate, setLinkDate] = useState('')
    const [editState, setEditState] = useState(false)
    const [description, setDescription] = useState(linkInfo.description)
    const [tags, setTags] = useState('')
    const [tagsArray, setTagsArray] = useState([])
    
    const formatDate = () => {
        const date = new Date(linkInfo.date)
        setLinkDate(date.toLocaleDateString())
    }

    useEffect(() => {
        formatDate();
    }, [formatDate])

    const changeTagsHandler = evt => {
        setTags(evt.target.value)
        console.log(tags)
    }

    const changeDescriptionHandler = evt => {
        setDescription(evt.target.value)
    }

    useEffect(() => {
        setTagsArray(tags.split(' ').map(tag => {
            return {tagName: tag}
        }))
    }, [tags])

    const editClickHandler = () => {
        setEditState(!editState)
        if (!tags) {
            link.tags.map(tag => {
                setTags(tags => tags + tag.tagName + ' ')
            })
        }
    }

    const confirmChanges = async () => {
        try {
            setUpload('loading...')
            const data = await request('http://localhost:5000/api/link/edit', 'POST', {code: link.code, tags: tagsArray, description: description}, {
                Authorization: `Bearer ${auth.token}`
            })

            await getLink()
    
            console.log(data)
            setEditState(false)
        }catch (e) {

        }
        setUpload('confirm')
        console.log(linkInfo)
    }

    const getLink = useCallback(async() => {
        try {
            const fetched = await request(`http://localhost:5000/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
    
            setLinkInfo(fetched)
        } catch (e) {
            console.log(e.message);
        }
    }, [auth.token, linkId, request])

    return (
        <div className='link-card'>
            <Link to='/profile'><button className='button green-button back-button'>Back</button></Link>
            <h3 className='link-card-title'>Your link</h3>
            <p>code: {linkInfo.code}</p>
            <p>to: <a href={linkInfo.to} target='_blank' rel='noopener noreferrer'>{linkInfo.to}</a></p>
            <p>from: <a href={linkInfo.from} target='_blank' rel='noopener noreferrer'>{linkInfo.from}</a></p>
            <p>number of clicks: {linkInfo.clicks}</p>
            {editState ? 
            (
                <textarea 
                    className='link-card-editor__textarea'
                    value={tags}
                    onChange={changeTagsHandler}
                    placeholder='Tags for link'
                    disabled={loading}
                />
            ) : (
                <p>tags: {linkInfo.tags.map(tag => {
                    return tag.tagName+ ' '
                })}</p>
            )}
            {editState ? 
            (
                <textarea 
                    className='link-card-editor__textarea'
                    value={description}
                    onChange={changeDescriptionHandler}
                    placeholder='Description for link'
                    disabled={loading}
                />
            ) : (
                <p>description: {linkInfo.description}</p>
            )}
            {editState ? 
            (
                <button className='button green-button edit-button' onClick={confirmChanges} disabled={loading}>{upload}</button>
            ) : (
                <></>
            )}
            <p>date of creating: {linkDate}</p>
            <button className='button green-button edit-button' onClick={editClickHandler} disabled={loading}>edit</button>
            <p>Note: you can edit description and tags of your link</p>
        </div>
    )
}

export default LinkCard