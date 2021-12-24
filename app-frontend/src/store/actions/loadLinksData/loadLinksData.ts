import { Link } from '../../../types/link';

export enum LoadLinksActionTypes {
  LOAD_LINKS_SUCCESS = 'LOAD_LINKS_SUCCESS',
  LOAD_LINKS_FAILED = 'LOAD_LINKS_FAILED',
  LOAD_LINKS_DATA = 'LOAD_LINKS_DATA',
}

interface FetchLinksAction {
  type: LoadLinksActionTypes.LOAD_LINKS_DATA,
  payload?: string,
}

interface FetchLinksSuccessAction {
  type: LoadLinksActionTypes.LOAD_LINKS_SUCCESS,
  payload: Link[],
}

interface FetchLinksFailedAction {
  type: LoadLinksActionTypes.LOAD_LINKS_FAILED,
  payload: string,
}

export type LinksActionTypes = FetchLinksAction | FetchLinksSuccessAction | FetchLinksFailedAction;

const loadLinksData = (token?: string): FetchLinksAction => ({
  type: LoadLinksActionTypes.LOAD_LINKS_DATA,
  payload: token,
});

export const loadLinksDataFailed = (error: string): FetchLinksFailedAction => ({
  type: LoadLinksActionTypes.LOAD_LINKS_FAILED,
  payload: error,
});

export const loadLinksDataSuccess = (data: Link[]): FetchLinksSuccessAction => ({
  type: LoadLinksActionTypes.LOAD_LINKS_SUCCESS,
  payload: data,
});

export default loadLinksData;
