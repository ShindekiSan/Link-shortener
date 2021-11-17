import React from 'react';
import MyButton from './MyButton';

function LinkInput () {
    return (
        <div>
            <form className='url-input-form'>
                <input className='url-input' type='text' disabled={true}></input>
                <button className='button green-button shorten-button' disabled={true}>shorten</button>
            </form>
            <p className='guest-warn'>Can only be used by an authorized user</p>
        </div>
        
    )
}

export default LinkInput