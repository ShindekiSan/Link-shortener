import { LinkData, LinkId } from '../../../types/link';
import { LoadLinkActionTypes } from '../../actionTypes';

export interface FetchLinkAction {
  type: LoadLinkActionTypes.LOAD_LINK_DATA,
  payload: LinkId,
}

interface FetchLinkActionSuccess {
  type: LoadLinkActionTypes.LOAD_LINK_SUCCESS,
  payload: LinkData,
}

interface FetchLinkActionFailed {
  type: LoadLinkActionTypes.LOAD_LINK_FAILED,
  payload: string,
}

export type LoadLinkActions = FetchLinkAction | FetchLinkActionFailed | FetchLinkActionSuccess;

const loadLinkData = (LinkParams: LinkId): FetchLinkAction => ({
  type: LoadLinkActionTypes.LOAD_LINK_DATA,
  payload: LinkParams,
});

export const loadLinkDataFailed = (error: string): FetchLinkActionFailed => ({
  type: LoadLinkActionTypes.LOAD_LINK_FAILED,
  payload: error,
});

export const loadLinkDataSuccess = (data: LinkData): FetchLinkActionSuccess => ({
  type: LoadLinkActionTypes.LOAD_LINK_SUCCESS,
  payload: data,
});

export default loadLinkData;
