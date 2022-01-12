import React, {
  useEffect, useState, FC,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkCard from '../../components/ProfilePage/LinkCard';
import { Link } from '../../types/link';
import editLinkData from '../../store/actions/editLinkData/editLinkData';
import { RootState } from '../../store/reducers/root';

interface LinkProps {
  link: Link,
  error: string,
}

type TagState = {
  tagName: string,
};

const LinkCardContainer:FC<LinkProps> = function ({ link, error }) {
  const [linkInfo, setLinkInfo] = useState<Link>(link); // eslint-disable-line
  const [upload, setUpload] = useState<string>('confirm');
  const [linkDate, setLinkDate] = useState<string>('');
  const [editState, setEditState] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(linkInfo.description);
  const [tags, setTags] = useState<string>('');
  const [tagsArray, setTagsArray] = useState<TagState[]>(linkInfo.tags);
  const { data } = useSelector((state: RootState) => state.user);
  const linkState = useSelector((state: RootState) => state.link);
  const dispatch = useDispatch();

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

  const confirmChanges = (): void => {
    setUpload('loading...');
    dispatch(editLinkData({
      code: link.code, tags: tagsArray, description, token: data?.data?.token,
    }));
    setEditState(false);
    setUpload('confirm');
  };

  return (
    <LinkCard
      linkInfo={linkInfo}
      editState={editState}
      loading={linkState.loading}
      description={description}
      tags={tags}
      upload={upload}
      editClickHandler={editClickHandler}
      confirmChanges={confirmChanges}
      changeTagsHandler={changeTagsHandler}
      changeDescriptionHandler={changeDescriptionHandler}
      linkDate={linkDate}
      loadingError={error}
    />
  );
};

export default LinkCardContainer;
