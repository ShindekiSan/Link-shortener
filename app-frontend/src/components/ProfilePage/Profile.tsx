import React, {
  FC,
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/typedSelector.hook';
import LinksBlock from './LinksBlock';
import ProfileHeader from './ProfileHeader';
import Loader from '../UI/Loader';
import loadLinksData from '../../store/actions/loadLinksData/loadLinksData';

const Profile:FC = function () {
  const [error, setError] = useState<string>('');
  const { data } = useTypedSelector((state) => state.user);
  const linksState = useTypedSelector((state) => state.links);
  const dispatch = useDispatch();

  const getLinks = useCallback(async () => {
    try {
      dispatch(loadLinksData(data.token));
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [data.token]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  return (
    <div>
      <ProfileHeader />
      { !linksState.loading && linksState.data
        ? <LinksBlock linksArray={linksState.data} error={error} /> : <Loader /> }
    </div>
  );
};

export default Profile;
