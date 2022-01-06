import React, {
  FC,
  useCallback, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinksBlock from './LinksBlock/LinksBlock';
import ProfileHeader from './ProfileHeader';
import Loader from '../UI/Loader';
import loadLinksData from '../../store/actions/loadLinksData/loadLinksData';
import { RootState } from '../../store/reducers/root';

const Profile:FC = function () {
  const { data } = useSelector((state: RootState) => state.user);
  const linksState = useSelector((state: RootState) => state.links);
  const dispatch = useDispatch();

  const getLinks = useCallback(() => {
    dispatch(loadLinksData(data?.data?.token!));
  }, [data?.data?.token!]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  return (
    <div>
      <ProfileHeader />
      { !linksState.loading && linksState.data
        ? <LinksBlock linksArray={linksState.data} error={linksState.error} /> : <Loader /> }
    </div>
  );
};

export default Profile;
