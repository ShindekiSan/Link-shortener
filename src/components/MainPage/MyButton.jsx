import React from 'react';

function MyAuthButton ({ text, buttonType }) {
    return (
        <button className={buttonType}>{text}</button>
    )
}

export default MyAuthButton