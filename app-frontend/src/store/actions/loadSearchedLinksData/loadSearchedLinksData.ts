import { SearchedLink } from '../../../types/link';

export enum LoadSearchedLinksActionTypes {
  LOAD_SEARCHED_LINKS_SUCCESS = 'LOAD_SEARCHED_LINKS_SUCCESS',
  LOAD_SEARCHED_LINKS_FAILED = 'LOAD_SEARCHED_LINKS_FAILED',
  LOAD_SEARCHED_LINKS_DATA = 'LOAD_SEARCHED_LINKS_DATA',
}

interface FetchSearchedLinksAction {
  type: LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_DATA,
  payload: string,
}

interface FetchSearchedLinksSuccessAction {
  type: LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_SUCCESS,
  payload: SearchedLink[],
}

interface FetchSearchedLinksFailedAction {
  type: LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_FAILED,
  payload: string,
}

export type LinksActionTypes =
  | FetchSearchedLinksAction
  | FetchSearchedLinksSuccessAction
  | FetchSearchedLinksFailedAction;

const loadSearchedLinksData = (tag: string): FetchSearchedLinksAction => ({
  type: LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_DATA,
  payload: tag,
});

export const loadSearchedLinksDataFailed = (error: string): FetchSearchedLinksFailedAction => ({
  type: LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_FAILED,
  payload: error,
});

export const loadSearchedLinksDataSuccess = (data: SearchedLink[])
: FetchSearchedLinksSuccessAction => ({
  type: LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_SUCCESS,
  payload: data,
});

export default loadSearchedLinksData;
