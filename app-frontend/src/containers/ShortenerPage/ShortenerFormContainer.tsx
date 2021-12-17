import React, { useState, useContext, useEffect } from 'react';
import ShortenerForm from '../../components/ShortenerPage/ShortenerForm';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';

interface TagsList {
  tagName: string
}

const ShortenerFormContainer = function () {
  const [notify, setNotify] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tagsArray, setTagsArray] = useState<Array<TagsList>>([]);
  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(evt.target.value);
    setInput(evt.target.value);
  };

  const changeTagsHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTags(evt.target.value);
  };

  const changeDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(evt.target.value);
  };

  useEffect(() => {
    setTagsArray(tags.split(' ').map((tag) => ({ tagName: tag })));
  }, [tags]);

  const clickHandler = async (): Promise<void> => {
    if (!link) {
      setNotify('Enter a link for shortening');
    } else {
      try {
        const data = await request('http://localhost:5000/api/link/generate', 'POST', { from: link, tags: tagsArray, description }, {
          Authorization: `Bearer ${auth.token}`,
        });
        setNotify(data.message);
      } catch (e: any) {
        setNotify(`Error:', ${e.message}`);
      }
    }
    setInput('');
    setTags('');
    setDescription('');
  };

  return (
    <ShortenerForm
      changeHandler={changeHandler}
      clickHandler={clickHandler}
      changeDescription={changeDescription}
      changeTagsHandler={changeTagsHandler}
      notify={notify}
      input={input}
      description={description}
      tags={tags}
    />
  );
};

export default ShortenerFormContainer;
