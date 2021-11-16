import React from 'react';
import MyButton from './MyButton';

function LinkInput () {
    return (
        <form className='url-input-form'>
            <input className='url-input' type='text' disabled='true'></input>
            <MyButton buttonType='button green-button shorten-button' text='shorten' />
        </form>
    )
}

export default LinkInput