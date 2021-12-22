import React, { FC, MouseEventHandler } from 'react';

interface ButtonProps {
  text: string,
  buttonType: string,
  clickFunc?: MouseEventHandler,
}

const MyAuthButton:FC<ButtonProps> = function ({ text, buttonType, clickFunc }) {
  return (
    <button className={buttonType} onClick={clickFunc} type="button">{text}</button>
  );
};

export default MyAuthButton;
