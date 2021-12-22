import { LOAD_SEARCHED_LINK_SUCCESS, LOAD_SEARCHED_LINK_FAILED, LOAD_SEARCHED_LINK_DATA } from '../../contants';
import { SearchedLinksData } from '../../../types/link';

const loadSearchedLinkData = (id: string) => ({
  type: LOAD_SEARCHED_LINK_DATA,
  id,
});

export const loadSearchedLinkDataFailed = (error: string) => ({
  type: LOAD_SEARCHED_LINK_FAILED,
  payload: error,
});

export const loadSearchedLinkDataSuccess = (data: SearchedLinksData) => ({
  type: LOAD_SEARCHED_LINK_SUCCESS,
  payload: data,
});

export default loadSearchedLinkData;
