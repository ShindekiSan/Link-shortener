import { LOAD_SEARCHED_LINKS_SUCCESS, LOAD_SEARCHED_LINKS_FAILED, LOAD_SEARCHED_LINKS_DATA } from '../../contants';
import { SearchedLinksData } from '../../../types/link';

const loadLinksData = () => ({
  type: LOAD_SEARCHED_LINKS_DATA,
});

export const loadLinksDataFailed = (error: string) => ({
  type: LOAD_SEARCHED_LINKS_FAILED,
  payload: error,
});

export const loadLinksDataSuccess = (data: SearchedLinksData) => ({
  type: LOAD_SEARCHED_LINKS_SUCCESS,
  payload: data,
});

export default loadLinksData;
