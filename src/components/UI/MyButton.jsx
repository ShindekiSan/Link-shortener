import React from 'react';

function MyAuthButton ({ text, buttonType, clickFunc }) {
    return (
        <button className={buttonType} onClick={clickFunc} >{text}</button>
    )
}

export default MyAuthButton