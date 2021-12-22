import { LOAD_LINK_SUCCESS, LOAD_LINK_FAILED, LOAD_LINK_DATA } from '../../contants';
import { LinkData, LinkId } from '../../../types/link';

const loadLinkData = (LinkParams: LinkId) => ({
  type: LOAD_LINK_DATA,
  payload: LinkParams,
});

export const loadLinkDataFailed = (error: string) => ({
  type: LOAD_LINK_FAILED,
  payload: error,
});

export const loadLinkDataSuccess = (data: LinkData) => ({
  type: LOAD_LINK_SUCCESS,
  payload: data,
});

export default loadLinkData;
