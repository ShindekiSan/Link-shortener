import React, { ChangeEventHandler, FC } from 'react';

interface FormProps {
  changeHandler: ChangeEventHandler,
  clickHandler: () => Promise<void>,
  changeDescription: ChangeEventHandler,
  changeTagsHandler: ChangeEventHandler,
  notify: string,
  input: string,
  description: string,
  tags: string
}

const ShortenerForm:FC<FormProps> = function ({
  changeHandler,
  clickHandler,
  changeDescription,
  changeTagsHandler,
  notify,
  input,
  description,
  tags,
}) {
  return (
    <div className="shortener-block">
      <h2 className="shortener-title">Shorten your link</h2>
      <div className="shortener-form">
        <input
          className="shortener-form__link-input"
          value={input}
          onChange={changeHandler}
          placeholder="Enter your link"
        />
        <textarea
          className="shortener-form__textarea"
          value={description}
          onChange={changeDescription}
          placeholder="Write small description about link (optional)"
        />
        <textarea
          className="shortener-form__textarea"
          value={tags}
          onChange={changeTagsHandler}
          placeholder="Enter some tags for link (optional)"
        />
        <button className="button green-button" onClick={clickHandler} type="button">shorten</button>
      </div>
      <p className="shortening-block__notification">{notify}</p>
    </div>

  );
};

export default ShortenerForm;
