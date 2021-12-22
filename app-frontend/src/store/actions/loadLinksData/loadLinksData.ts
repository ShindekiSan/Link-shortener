import { LOAD_LINKS_SUCCESS, LOAD_LINKS_FAILED, LOAD_LINKS_DATA } from '../../contants';
import { LinksData } from '../../../types/link';

const loadLinksData = (token: string) => ({
  type: LOAD_LINKS_DATA,
  payload: token,
});

export const loadLinksDataFailed = (error: string) => ({
  type: LOAD_LINKS_FAILED,
  payload: error,
});

export const loadLinksDataSuccess = (data: LinksData) => ({
  type: LOAD_LINKS_SUCCESS,
  payload: data,
});

export default loadLinksData;
