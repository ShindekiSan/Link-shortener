import React, {
  FC,
  useCallback, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/typedSelector.hook';
import LinksBlock from './LinksBlock/LinksBlock';
import ProfileHeader from './ProfileHeader';
import Loader from '../UI/Loader';
import loadLinksData from '../../store/actions/loadLinksData/loadLinksData';

const Profile:FC = function () {
  const { data } = useTypedSelector((state) => state.user);
  const linksState = useTypedSelector((state) => state.links);
  const dispatch = useDispatch();

  const getLinks = useCallback(() => {
    dispatch(loadLinksData(data.data?.token));
  }, [data.data?.token]);

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
