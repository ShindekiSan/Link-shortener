import React, { ChangeEventHandler, FC } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../UI/Loader';

export interface Tag {
  tagName: string,
}

export interface LinkProps {
  linkInfo: {
    code: string,
    to: string,
    from: string,
    clicks: number,
    tags: {
      tagName: string,
    }[],
    description: string,
    _id: string,
    date: Date,
  },
  editState: boolean,
  loading: boolean,
  description: string,
  upload: string,
  tags: string,
  loadingError: string,
  changeTagsHandler: ChangeEventHandler,
  changeDescriptionHandler: ChangeEventHandler,
  linkDate: string,
  confirmChanges: () => void,
  editClickHandler: () => void
}

const LinkCard:FC<LinkProps> = function ({
  linkInfo,
  editState,
  changeTagsHandler,
  loading,
  changeDescriptionHandler,
  description,
  linkDate,
  upload,
  confirmChanges,
  editClickHandler,
  tags,
  loadingError,
}) {
  return (
    <div className="link-card">
      {linkInfo
        ? (
          <div>
            <Link to="/profile"><button className="button green-button back-button" type="button">Back</button></Link>
            {loadingError
              ? (
                <h3 className="link-card-title">{loadingError}</h3>
              ) : (
                <div>
                  <h3 className="link-card-title">Your link</h3>
                  <p>
                    code:
                    {linkInfo.code}
                  </p>
                  <p>
                    to:
                    <a href={linkInfo.to} target="_blank" rel="noopener noreferrer">{linkInfo.to}</a>
                  </p>
                  <p>
                    from:
                    <a href={linkInfo.from} target="_blank" rel="noopener noreferrer">{linkInfo.from}</a>
                  </p>
                  <p>
                    number of clicks:
                    {linkInfo.clicks}
                  </p>
                  {editState
                    ? (
                      <textarea
                        className="link-card-editor__textarea"
                        value={tags}
                        onChange={changeTagsHandler}
                        placeholder="Tags for link"
                        disabled={loading}
                      />
                    ) : (
                      <p>
                        tags:
                        {linkInfo.tags ? linkInfo.tags.map((tag:Tag) => `${tag.tagName} `) : 'Loading...'}
                      </p>
                    )}
                  {editState
                    ? (
                      <textarea
                        className="link-card-editor__textarea"
                        value={description}
                        onChange={changeDescriptionHandler}
                        placeholder="Description for link"
                        disabled={loading}
                      />
                    ) : (
                      <p>
                        description:
                        {linkInfo.description}
                      </p>
                    )}
                  {editState
                    ? (
                      <button
                        className="button green-button edit-button"
                        onClick={confirmChanges}
                        disabled={loading}
                        type="button"
                      >
                        {upload}
                      </button>
                    ) : (
                      <>
                      </>
                    )}
                  <p>
                    date of creating:
                    {linkDate}
                  </p>
                  <button className="button green-button edit-button" onClick={editClickHandler} disabled={loading} type="button">edit</button>
                  <p>Note: you can edit description and tags of your link</p>
                </div>
              )}
          </div>
        )
        : <Loader />}
    </div>
  );
};

export default LinkCard;
