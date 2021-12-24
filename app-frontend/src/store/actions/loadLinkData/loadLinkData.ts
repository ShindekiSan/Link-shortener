import { LinkData, LinkId } from '../../../types/link';

export enum LoadLinkActionTypes {
  LOAD_LINK_DATA = 'LOAD_LINK_DATA',
  LOAD_LINK_FAILED = 'LOAD_LINK_FAILED',
  LOAD_LINK_SUCCESS = 'LOAD_LINK_SUCCESS',
}

interface LoadLinkAction {
  type: LoadLinkActionTypes.LOAD_LINK_DATA,
  payload: LinkId,
}

interface LoadLinkActionSuccess {
  type: LoadLinkActionTypes.LOAD_LINK_SUCCESS,
  payload: LinkData,
}

interface LoadLinkActionFailed {
  type: LoadLinkActionTypes.LOAD_LINK_FAILED,
  payload: string,
}

export type LoadLinkActions = LoadLinkAction | LoadLinkActionFailed | LoadLinkActionSuccess;

const loadLinkData = (LinkParams: LinkId): LoadLinkAction => ({
  type: LoadLinkActionTypes.LOAD_LINK_DATA,
  payload: LinkParams,
});

export const loadLinkDataFailed = (error: string): LoadLinkActionFailed => ({
  type: LoadLinkActionTypes.LOAD_LINK_FAILED,
  payload: error,
});

export const loadLinkDataSuccess = (data: LinkData): LoadLinkActionSuccess => ({
  type: LoadLinkActionTypes.LOAD_LINK_SUCCESS,
  payload: data,
});

export default loadLinkData;
