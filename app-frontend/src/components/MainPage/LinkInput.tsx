import React, {
  ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler,
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/root';

export interface LinkInputProps {
  isAuthenticated: boolean,
  linkValue: string,
  changeHandler: ChangeEventHandler,
  pressHandler: KeyboardEventHandler,
  clickHandler: MouseEventHandler,
}

const LinkInput:FC<LinkInputProps> = function ({
  isAuthenticated, linkValue, changeHandler, pressHandler, clickHandler,
}) {
  const { error, data } = useSelector((state: RootState) => state.link);
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
      <p className="url-input__notification">
        {isAuthenticated
          ? (
            <span>
              {data?.data?.message ? (
                `${data.data?.message}`
              ) : (
                `${error}`
              )}
            </span>
          ) : (
            'Can only be used by authorized user'
          )}
      </p>
    </div>

  );
};

export default LinkInput;
