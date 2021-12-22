import { LOAD_SEARCHED_LINKS_SUCCESS, LOAD_SEARCHED_LINKS_FAILED, LOAD_SEARCHED_LINKS_DATA } from '../../contants';
import { SearchedLinksData } from '../../../types/link';

const loadSearchedLinksData = (tag: string) => ({
  type: LOAD_SEARCHED_LINKS_DATA,
  payload: tag,
});

export const loadSearchedLinksDataFailed = (error: string) => ({
  type: LOAD_SEARCHED_LINKS_FAILED,
  payload: error,
});

export const loadSearchedLinksDataSuccess = (data: SearchedLinksData) => ({
  type: LOAD_SEARCHED_LINKS_SUCCESS,
  payload: data,
});

export default loadSearchedLinksData;
