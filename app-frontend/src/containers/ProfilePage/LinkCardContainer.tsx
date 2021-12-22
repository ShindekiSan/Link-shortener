import React, {
  useEffect, useState, useContext, useCallback, FC,
} from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import useHttp, { RequestPromise } from '../../hooks/http.hook';
import LinkCard from '../../components/ProfilePage/LinkCard';
import { Link } from '../../types/link';

interface LinkProps {
  link: Link,
  error: string,
}

type TagState = {
  tagName: string,
};

const LinkCardContainer:FC<LinkProps> = function ({ link, error }) {
  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();
  const linkId = useParams().id;
  const [linkInfo, setLinkInfo] = useState<Link>(link);
  const [upload, setUpload] = useState<string>('confirm');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [linkDate, setLinkDate] = useState<string>('');
  const [editState, setEditState] = useState<boolean>(false);
  const [editMessage, setEditMessage] = useState<string>('');
  const [description, setDescription] = useState<string>(linkInfo.description);
  const [tags, setTags] = useState<string>('');
  const [tagsArray, setTagsArray] = useState<TagState[]>(linkInfo.tags);

  const formatDate = (): void => {
    const date = new Date(linkInfo.date);
    setLinkDate(date.toLocaleDateString());
  };

  useEffect(() => {
    formatDate();
  }, [formatDate]);

  const changeTagsHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTags(evt.target.value);
  };

  const changeDescriptionHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(evt.target.value);
  };

  useEffect(() => {
    setTagsArray(tags.split(' ').map((tag) => ({ tagName: tag })));
  }, [tags]);

  const editClickHandler = (): void => {
    setEditState(!editState);
    if (!tags) {
      linkInfo.tags.forEach((tag) => {
        setTags((currentTags) => `${currentTags + tag.tagName} `);
      });
    }
  };

  const getChangedLink = useCallback(async (): Promise<void> => {
    try {
      const fetched: RequestPromise = await request(`http://localhost:5000/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });

      setLinkInfo(fetched.link);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  }, [auth.token, linkId, request]);

  const confirmChanges = async (): Promise<void> => {
    try {
      setUpload('loading...');
      const data: RequestPromise = await request('http://localhost:5000/api/link/edit', 'POST', { code: link.code, tags: tagsArray, description }, {
        Authorization: `Bearer ${auth.token}`,
      });

      await getChangedLink();

      setEditMessage(data.message);
      setEditState(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
    setUpload('confirm');
  };

  return (
    <LinkCard
      linkInfo={linkInfo}
      editState={editState}
      loading={loading}
      description={description}
      tags={tags}
      upload={upload}
      editClickHandler={editClickHandler}
      confirmChanges={confirmChanges}
      changeTagsHandler={changeTagsHandler}
      changeDescriptionHandler={changeDescriptionHandler}
      linkDate={linkDate}
      loadingError={error}
      error={errorMessage}
      editMessage={editMessage}
    />
  );
};

export default LinkCardContainer;
