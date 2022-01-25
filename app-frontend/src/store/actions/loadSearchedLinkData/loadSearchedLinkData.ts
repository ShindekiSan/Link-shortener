import { SearchedLinkData } from '../../../types/link';
import { LoadSearchedLinkActionTypes } from '../../actionTypes';

export interface FetchSearchedLinkAction {
  type: LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_DATA,
  payload?: string,
}

interface FetchSearchedLinkActionSuccess {
  type: LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_SUCCESS,
  payload: SearchedLinkData,
}

interface FetchSearchedLinkActionFailed {
  type: LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_FAILED,
  payload: string,
}

export type LinkActionTypes =
  | FetchSearchedLinkAction
  | FetchSearchedLinkActionSuccess
  | FetchSearchedLinkActionFailed;

const loadSearchedLinkData = (id: string | undefined): FetchSearchedLinkAction => ({
  type: LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_DATA,
  payload: id,
});

export const loadSearchedLinkDataFailed = (error: string): FetchSearchedLinkActionFailed => ({
  type: LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_FAILED,
  payload: error,
});

export const loadSearchedLinkDataSuccess = (data: SearchedLinkData)
: FetchSearchedLinkActionSuccess => ({
  type: LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_SUCCESS,
  payload: data,
});

export default loadSearchedLinkData;
