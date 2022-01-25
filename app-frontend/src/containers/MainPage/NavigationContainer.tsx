import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/MainPage/Navigation';
import logoutUser from '../../store/actions/authorizeUser/logout';
import { RootState } from '../../store/reducers/root';

const NavigationContainer:FC = function () {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);

  const handleLogout = (): void => {
    dispatch(logoutUser());
  };

  return (
    <Navigation
      logoutHandler={handleLogout}
      isAuthenticated={!!data?.data?.userName}
      userName={data?.data?.userName}
    />
  );
};

export default NavigationContainer;
