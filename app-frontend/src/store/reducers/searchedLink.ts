import { SearchedLinkData } from '../../types/link';
import { LinkActionTypes } from '../actions/loadSearchedLinkData/loadSearchedLinkData';
import { LoadSearchedLinkActionTypes } from '../actionTypes';

export interface SearchedLinkState {
  data: SearchedLinkData | null,
  loading: boolean,
  error: string,
}

export const initialState: SearchedLinkState = {
  data: null,
  loading: false,
  error: '',
};

const searchedLink = (state = initialState, action: LinkActionTypes): SearchedLinkState => {
  switch (action.type) {
    case LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_DATA:
      return {
        ...state,
        loading: true,
      };
    case LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default searchedLink;
