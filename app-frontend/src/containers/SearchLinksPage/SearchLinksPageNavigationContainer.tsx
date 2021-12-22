import React, { useState, FC } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import SearchLinksPageNavigation from '../../components/SearchLinksPage/SearchLinksPageNavigation';
import useTypedSelector from '../../hooks/typedSelector.hook';

interface FuncProps {
  searchHandler: (tag: string) => Promise<void>
}

const SearchLinksPageNavigationContainer:FC<FuncProps> = function ({ searchHandler }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']); // eslint-disable-line
  const { data } = useTypedSelector((state) => state.user);
  const [tag, setTag] = useState<string>('');

  const handleLogout = (): void => {
    removeCookie('user');
    navigate('/');
    window.location.reload();
  };

  const searchLinks = (evt: React.KeyboardEvent): void => {
    if (evt.key === 'Enter') {
      searchHandler(tag);
      setTag('');
    }
  };

  const changeTagHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setTag(evt.target.value);
  };

  return (
    <SearchLinksPageNavigation
      searchHandler={searchLinks}
      changeTagHandler={changeTagHandler}
      isAuthenticated={!!data.userName}
      userName={data.userName}
      logoutHandler={handleLogout}
      tag={tag}
    />
  );
};

export default SearchLinksPageNavigationContainer;
