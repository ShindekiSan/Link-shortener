import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';

function LinkInput () {
    const {request} = useHttp()
    const [link, setLink] = useState('')
    const [input, setInput] = useState('')
    const auth = useContext(AuthContext)

    const changeHandler = evt => {
        setLink(evt.target.value)
        setInput(evt.target.value)
    }

    const pressHandler = async evt => {
        if (evt.key === 'Enter') {
            try {
                const data = await request('http://localhost:5000/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log(data)
            } catch (e) {

            }
            setInput('')
        }
    }
    return (
        <div>
            <div className='url-input-form'>
                <input 
                    className={auth.isAuthenticated ? 'url-input url-input--authorized-user' : 'url-input'} 
                    type='text' 
                    value={input}
                    disabled={!auth.isAuthenticated}
                    onChange={changeHandler}
                    onKeyPress={pressHandler}>
                </input>
                <button 
                    className={auth.isAuthenticated ? 'button green-button shorten-button shorten-button--authorized-user' 
                    : 'button green-button shorten-button'}
                    disabled={!auth.isAuthenticated}>
                        shorten
                    </button>
            </div>
            <p className={auth.isAuthenticated ? 'authorized-user' : 'guest-warn'}>Can only be used by an authorized user</p>
        </div>
        
    )
}

export default LinkInput