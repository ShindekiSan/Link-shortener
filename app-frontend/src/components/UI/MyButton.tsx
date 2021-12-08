import React, { FC, MouseEventHandler } from 'react';

interface buttonProps {
	text: string,
	buttonType: string,
	clickFunc?: MouseEventHandler,
}

const MyAuthButton:FC<buttonProps> = function ({ text, buttonType, clickFunc }) {
	return (
		<button className={buttonType} onClick={clickFunc} type="button">{text}</button>
	);
};

export default MyAuthButton;
