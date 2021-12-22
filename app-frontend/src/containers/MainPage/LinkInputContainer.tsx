import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import LinkInput from '../../components/MainPage/LinkInput';
import useTypedSelector from '../../hooks/typedSelector.hook';
import addLink from '../../store/actions/addLink/addLink';

const LinkInputContainer:FC = function () {
  const [link, setLink] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const { data } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(evt.target.value);
    setInput(evt.target.value);
  };

  const clickHandler = async (): Promise<void> => {
    dispatch(addLink({
      from: link, tags: [], description: '', token: data.token,
    }));
    setInput('');
  };

  const pressHandler = async (evt: React.KeyboardEvent): Promise<void> => {
    if (evt.key === 'Enter') {
      clickHandler();
    }
  };

  return (
    <LinkInput
      isAuthenticated={!!data.userName}
      linkValue={input}
      changeHandler={changeHandler}
      clickHandler={clickHandler}
      pressHandler={pressHandler}
    />
  );
};

export default LinkInputContainer;
