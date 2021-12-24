import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShortenerNavigation from '../../components/ShortenerPage/ShortenerNavigation';
import useTypedSelector from '../../hooks/typedSelector.hook';
import logoutUser from '../../store/actions/authorizeUser/logout';

const ShortenerNavigationContainer:FC = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useTypedSelector((state) => state.user);

  const handleLogout = (): void => {
    dispatch(logoutUser);
    navigate('/');
  };

  return (
    <ShortenerNavigation logoutHandler={handleLogout} userName={data.data?.userName} />
  );
};

export default ShortenerNavigationContainer;
