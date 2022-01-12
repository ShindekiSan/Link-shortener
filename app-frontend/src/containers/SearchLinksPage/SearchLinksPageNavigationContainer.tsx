import React, { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchLinksPageNavigation from '../../components/SearchLinksPage/SearchLinksPageNavigation';
import logoutUser from '../../store/actions/authorizeUser/logout';
import loadSearchedLinksData from '../../store/actions/loadSearchedLinksData/loadSearchedLinksData';
import { RootState } from '../../store/reducers/root';

const SearchLinksPageNavigationContainer:FC = function () {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);
  const [tag, setTag] = useState<string>('');

  const handleLogout = (): void => {
    dispatch(logoutUser());
  };

  const searchLinks = (evt: React.KeyboardEvent): void => {
    if (evt.key === 'Enter') {
      dispatch(loadSearchedLinksData(tag));
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
      isAuthenticated={!!data?.data?.userName}
      userName={data?.data?.userName}
      logoutHandler={handleLogout}
      tag={tag}
    />
  );
};

export default SearchLinksPageNavigationContainer;
