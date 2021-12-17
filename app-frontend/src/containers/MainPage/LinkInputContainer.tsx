import React, { useContext, useState } from 'react';
import LinkInput from '../../components/MainPage/LinkInput';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/http.hook';

const LinkInputContainer = function () {
  const { request } = useHttp();
  const [link, setLink] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [notify, setNotify] = useState<string>('');
  const auth = useContext(AuthContext);

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(evt.target.value);
    setInput(evt.target.value);
  };

  const clickHandler = async (): Promise<void> => {
    if (!link) {
      setNotify('Enter a link for shortening');
    } else {
      try {
        const data = await request('http://localhost:5000/api/link/generate', 'POST', { from: link, tags: [], description: '' }, {
          Authorization: `Bearer ${auth.token}`,
        });

        setNotify(data.message);
      } catch (e: any) {
        setNotify(`Error: ${e.message}`);
      }
    }
    setInput('');
  };

  const pressHandler = async (evt: React.KeyboardEvent): Promise<void> => {
    if (evt.key === 'Enter') {
      clickHandler();
    }
  };

  return (
    <LinkInput
      isAuthenticated={auth.isAuthenticated}
      linkValue={input}
      changeHandler={changeHandler}
      clickHandler={clickHandler}
      pressHandler={pressHandler}
      notify={notify}
    />
  );
};

export default LinkInputContainer;
