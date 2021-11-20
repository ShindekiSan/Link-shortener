import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';

function ShortenerForm () {
    const [notify, setNotify] = useState('')
    const [input, setInput] = useState('')
    const [link, setLink] = useState('')
    const [tags, setTags] = useState('')
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    const changeHandler = evt => {
        setLink(evt.target.value)
        setInput(evt.target.value)
        
    }

    const changeTagsHandler = evt => {
        setTags(evt.target.value)
    }

    const clickHandler = async () => {
        if (!link) {
            setNotify('Enter a link for shortening')
        } else {
            try {
                const data = await request('http://localhost:5000/api/link/generate', 'POST', {from: link, tags: tags}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log(data)
                setNotify('Your link has been shortened successfully! Check profile')
            } catch (e) {
                
            }
        }
        setInput('')
        setTags('')
    }

    return (
        <div className='shortener-block'>
            <h2 className='shortener-title'>Shorten your link</h2>
            <div className='shortener-form'>
                <input 
                    className='shortener-form__link-input'
                    value={input}
                    onChange={changeHandler}
                    placeholder='Enter your link'
                />
                <textarea 
                    className='shortener-form__tags-input'
                    value={tags}
                    onChange={changeTagsHandler}
                    placeholder='Enter some tags for link (optional)'
                />
                <button className='button green-button' onClick={clickHandler}>shorten</button>
            </div>
            <p className='shortening-block__notification'>{notify}</p>
        </div>
    )
}

export default ShortenerForm