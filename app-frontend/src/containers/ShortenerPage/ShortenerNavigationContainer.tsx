import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ShortenerNavigation from '../../components/ShortenerPage/ShortenerNavigation';
import useTypedSelector from '../../hooks/typedSelector.hook';

const ShortenerNavigationContainer:FC = function () {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']); // eslint-disable-line
  const { data } = useTypedSelector((state) => state.user);

  const handleLogout = (): void => {
    removeCookie('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <ShortenerNavigation logoutHandler={handleLogout} userName={data.userName} />
  );
};

export default ShortenerNavigationContainer;
