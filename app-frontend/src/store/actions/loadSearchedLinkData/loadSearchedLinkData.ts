import { LOAD_SEARCHED_LINK_SUCCESS, LOAD_SEARCHED_LINK_FAILED, LOAD_SEARCHED_LINK_DATA } from '../../contants';
import { SearchedLinkData } from '../../../types/link';

const loadSearchedLinkData = (id: string | undefined) => ({
  type: LOAD_SEARCHED_LINK_DATA,
  payload: id,
});

export const loadSearchedLinkDataFailed = (error: string) => ({
  type: LOAD_SEARCHED_LINK_FAILED,
  payload: error,
});

export const loadSearchedLinkDataSuccess = (data: SearchedLinkData) => ({
  type: LOAD_SEARCHED_LINK_SUCCESS,
  payload: data,
});

export default loadSearchedLinkData;
