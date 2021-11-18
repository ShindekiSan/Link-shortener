import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function LinkInput () {
    const auth = useContext(AuthContext)
    return (
        <div>
            <form className='url-input-form'>
                <input 
                    className={auth.isAuthenticated ? 'url-input url-input--authorized-user' : 'url-input'} 
                    type='text' 
                    disabled={!auth.isAuthenticated}>
                </input>
                <button 
                    className={auth.isAuthenticated ? 'button green-button shorten-button shorten-button--authorized-user' 
                    : 'button green-button shorten-button'}
                    disabled={!auth.isAuthenticated}>
                        shorten
                    </button>
            </form>
            <p className={auth.isAuthenticated ? 'authorized-user' : 'guest-warn'}>Can only be used by an authorized user</p>
        </div>
        
    )
}

export default LinkInput