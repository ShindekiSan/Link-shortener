import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkInput from '../../components/MainPage/LinkInput';
import addLink from '../../store/actions/addLink/addLink';
import { RootState } from '../../store/reducers/root';

const LinkInputContainer:FC = function () {
  const [link, setLink] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(evt.target.value);
    setInput(evt.target.value);
  };

  const clickHandler = (): void => {
    dispatch(addLink({
      from: link, tags: [], description: '', token: data?.data?.token,
    }));
    setInput('');
  };

  const pressHandler = (evt: React.KeyboardEvent): void => {
    if (evt.key === 'Enter') {
      clickHandler();
    }
  };

  return (
    <LinkInput
      isAuthenticated={!!data?.data?.userName}
      linkValue={input}
      changeHandler={changeHandler}
      clickHandler={clickHandler}
      pressHandler={pressHandler}
    />
  );
};

export default LinkInputContainer;
