import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShortenerNavigation from '../../components/ShortenerPage/ShortenerNavigation';
import logoutUser from '../../store/actions/authorizeUser/logout';
import { RootState } from '../../store/reducers/root';

const ShortenerNavigationContainer:FC = function () {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);

  const handleLogout = (): void => {
    dispatch(logoutUser());
  };

  return (
    <ShortenerNavigation logoutHandler={handleLogout} userName={data?.data?.userName} />
  );
};

export default ShortenerNavigationContainer;
