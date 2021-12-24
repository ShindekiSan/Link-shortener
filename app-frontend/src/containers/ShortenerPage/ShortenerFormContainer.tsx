import React, {
  useState, useEffect, FC,
} from 'react';
import { useDispatch } from 'react-redux';
import ShortenerForm from '../../components/ShortenerPage/ShortenerForm';
import useTypedSelector from '../../hooks/typedSelector.hook';
import addLink from '../../store/actions/addLink/addLink';

interface TagsList {
  tagName: string
}

const ShortenerFormContainer:FC = function () {
  const [input, setInput] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const dispatch = useDispatch();
  const [tags, setTags] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tagsArray, setTagsArray] = useState<Array<TagsList>>([]);
  const { data } = useTypedSelector((state) => state.user);

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

  const clickHandler = (): void => {
    dispatch(addLink({
      from: link, tags: tagsArray, description, token: data.data?.token,
    }));
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
      input={input}
      description={description}
      tags={tags}
    />
  );
};

export default ShortenerFormContainer;
