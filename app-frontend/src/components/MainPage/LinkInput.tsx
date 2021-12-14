import React, {
  ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler,
} from 'react';

interface LinkInputProps {
  isAuthenticated: boolean,
  linkValue: string,
  changeHandler: ChangeEventHandler,
  pressHandler: KeyboardEventHandler,
  clickHandler: MouseEventHandler,
  notify: string,
}

const LinkInput:FC<LinkInputProps> = function ({
  isAuthenticated, linkValue, changeHandler, pressHandler, clickHandler, notify,
}) {
  return (
    <div>
      <div className="url-input-form">
        <input
          className={isAuthenticated ? 'url-input url-input--authorized-user' : 'url-input'}
          type="text"
          value={linkValue}
          disabled={!isAuthenticated}
          onChange={changeHandler}
          onKeyPress={pressHandler}
        />
        <button
          className="button green-button shorten-button shorten-button"
          disabled={!isAuthenticated}
          onClick={clickHandler}
          type="button"
        >
          shorten
        </button>
      </div>
      <p className="url-input__notification">{isAuthenticated ? `${notify}` : 'Can only be used by authorized user' }</p>
    </div>

  );
};

export default LinkInput;
