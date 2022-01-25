import { SearchedLink } from '../../types/link';
import { LinksActionTypes } from '../actions/loadSearchedLinksData/loadSearchedLinksData';
import { LoadSearchedLinksActionTypes } from '../actionTypes';

export interface SearchedLinksState {
  data: SearchedLink[] | null,
  error: string,
  loading: boolean,
}

export const initialState: SearchedLinksState = {
  data: null,
  error: '',
  loading: false,
};

const searchedLinks = (state = initialState, action: LinksActionTypes)
: SearchedLinksState => {
  switch (action.type) {
    case LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_DATA:
      return {
        ...state,
        loading: true,
      };
    case LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default searchedLinks;
