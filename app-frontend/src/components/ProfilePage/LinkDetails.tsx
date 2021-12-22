import React, {
  useState, useEffect, useCallback, FC,
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
  const [error, setError] = useState<string>('');
  const { id } = useParams();

  const getLink = useCallback(async () => {
    try {
      dispatch(loadLinkData({ token: data.token, id }));
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [data.token, id]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <div>
      {!linkState.loading && linkState.data
        ? <LinkCard link={linkState.data} error={error} /> : <Loader />}
    </div>
  );
};

export default LinkDetails;
