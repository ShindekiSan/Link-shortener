import { LinkData, LinkEdit } from '../../../types/link';
import { EditLinkActionTypes } from '../../actionTypes';

export interface EditLinkAction {
  type: EditLinkActionTypes.EDIT_LINK_DATA,
  payload: LinkEdit,
}

interface EditLinkActionSuccess {
  type: EditLinkActionTypes.EDIT_LINK_SUCCESS,
  payload: LinkData,
}

interface EditLinkActionFailed {
  type: EditLinkActionTypes.EDIT_LINK_FAILED,
  payload: string,
}

export type EditLinkActions = EditLinkAction | EditLinkActionFailed | EditLinkActionSuccess;

const editLinkData = (linkData: LinkEdit): EditLinkAction => ({
  type: EditLinkActionTypes.EDIT_LINK_DATA,
  payload: linkData,
});

export const editLinkDataSuccess = (link: LinkData): EditLinkActionSuccess => ({
  type: EditLinkActionTypes.EDIT_LINK_SUCCESS,
  payload: link,
});

export const editLinkDataFailed = (error: string): EditLinkActionFailed => ({
  type: EditLinkActionTypes.EDIT_LINK_FAILED,
  payload: error,
});

export default editLinkData;
