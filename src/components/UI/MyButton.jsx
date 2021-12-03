import React from 'react';

const MyAuthButton = function ({ text, buttonType, clickFunc }) {
	return (
		<button className={buttonType} onClick={clickFunc} type="button">{text}</button>
	);
};

export default MyAuthButton;
