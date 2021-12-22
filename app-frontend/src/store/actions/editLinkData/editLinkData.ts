import { EDIT_LINK_DATA, EDIT_LINK_FAILED, EDIT_LINK_SUCCESS } from '../../contants';
import { LinkData, LinkEdit } from '../../../types/link';

const editLinkData = (linkData: LinkEdit) => ({
  type: EDIT_LINK_DATA,
  payload: linkData,
});

export const editLinkDataSuccess = (link: LinkData) => ({
  type: EDIT_LINK_SUCCESS,
  payload: link,
});

export const editLinkDataFailed = (error: string) => ({
  type: EDIT_LINK_FAILED,
  payload: error,
});

export default editLinkData;
