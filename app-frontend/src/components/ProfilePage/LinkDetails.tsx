import React, {
  useEffect, useCallback, FC,
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../UI/Loader';
import useTypedSelector from '../../hooks/typedSelector.hook';
import LinkCard from '../../containers/ProfilePage/LinkCardContainer';
import loadLinkData from '../../store/actions/loadLinkData/loadLinkData';

const LinkDetails:FC = function () {
  const dispatch = useDispatch();
  const { data } = useTypedSelector((state) => state.user);
  const linkState = useTypedSelector((state) => state.link);
  const { id } = useParams();

  const getLink = useCallback(() => {
    dispatch(loadLinkData({ token: data.data?.token, id }));
  }, [data.data?.token, id]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <div>
      {!linkState.loading && linkState.data.data
        ? <LinkCard link={linkState.data.data} error={linkState.error} /> : <Loader />}
    </div>
  );
};

export default LinkDetails;
