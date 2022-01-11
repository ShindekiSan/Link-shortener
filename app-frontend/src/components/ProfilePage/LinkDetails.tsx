import React, {
  useEffect, useCallback, FC,
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../UI/Loader';
import LinkCard from '../../containers/ProfilePage/LinkCardContainer/LinkCardContainer';
import loadLinkData from '../../store/actions/loadLinkData/loadLinkData';
import { RootState } from '../../store/reducers/root';

const LinkDetails:FC = function () {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);
  const linkState = useSelector((state: RootState) => state.link);
  const { id } = useParams<{ id: string }>();

  const getLink = useCallback(() => {
    dispatch(loadLinkData({ token: data?.data?.token, id }));
  }, [data?.data?.token, id]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <div>
      {!linkState.loading && linkState.data?.data
        ? <LinkCard link={linkState.data.data} error={linkState.error} /> : <Loader />}
    </div>
  );
};

export default LinkDetails;
