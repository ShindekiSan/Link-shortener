import { AddLink, LinkData } from '../../../types/link';
import { AddLinkActionTypes } from '../../actionTypes';

export interface AddLinkAction {
  type: AddLinkActionTypes.ADD_LINK_DATA,
  payload: AddLink,
}

interface AddLinkActionSuccess {
  type: AddLinkActionTypes.ADD_LINK_SUCCESS,
  payload: LinkData,
}

interface AddLinkActionFailed {
  type: AddLinkActionTypes.ADD_LINK_FAILED,
  payload: string,
}

export type AddLinkActions = AddLinkAction | AddLinkActionFailed | AddLinkActionSuccess;

const addLink = (link: AddLink): AddLinkAction => ({
  type: AddLinkActionTypes.ADD_LINK_DATA,
  payload: link,
});

export const addLinkFailed = (error: string):AddLinkActionFailed => ({
  type: AddLinkActionTypes.ADD_LINK_FAILED,
  payload: error,
});

export const addLinkSuccess = (notify: LinkData):AddLinkActionSuccess => ({
  type: AddLinkActionTypes.ADD_LINK_SUCCESS,
  payload: notify,
});

export default addLink;
