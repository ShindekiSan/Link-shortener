import React, {
  useEffect, useState, useContext, useCallback, FC,
} from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';
import LinkCard from '../../components/ProfilePage/LinkCard';

interface LinkProps {
  link: {
    code: string,
    to: string,
    from: string,
    clicks: number,
    tags: {
      tagName: string,
    }[],
    description: string,
    date: Date
  },
  error: string,
}

const LinkCardContainer:FC<LinkProps> = function ({ link, error }) {
  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();
  const linkId = useParams().id;
  const [linkInfo, setLinkInfo] = useState(link);
  const [upload, setUpload] = useState('confirm');
  const [errorMessage, setErrorMessage] = useState('');
  const [linkDate, setLinkDate] = useState('');
  const [editState, setEditState] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const [description, setDescription] = useState(linkInfo.description);
  const [tags, setTags] = useState('');
  const [tagsArray, setTagsArray] = useState(linkInfo.tags);

  const formatDate = () => {
    const date = new Date(linkInfo.date);
    setLinkDate(date.toLocaleDateString());
  };

  useEffect(() => {
    formatDate();
  }, [formatDate]);

  const changeTagsHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTags(evt.target.value);
  };

  const changeDescriptionHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
  };

  useEffect(() => {
    setTagsArray(tags.split(' ').map((tag) => ({ tagName: tag })));
  }, [tags]);

  const editClickHandler = () => {
    setEditState(!editState);
    if (!tags) {
      linkInfo.tags.forEach((tag) => {
        setTags((currentTags) => `${currentTags + tag.tagName} `);
      });
    }
  };

  const getChangedLink = useCallback(async () => {
    try {
      const fetched = await request(`http://localhost:5000/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });

      setLinkInfo(fetched);
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  }, [auth.token, linkId, request]);

  const confirmChanges = async () => {
    try {
      setUpload('loading...');
      const data = await request('http://localhost:5000/api/link/edit', 'POST', { code: link.code, tags: tagsArray, description }, {
        Authorization: `Bearer ${auth.token}`,
      });

      await getChangedLink();

      setEditMessage(data.message);
      setEditState(false);
    } catch (e: any) {
      setErrorMessage(e.message);
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
