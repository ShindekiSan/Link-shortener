import { SearchedLink } from '../../types/link';
import { LoadSearchedLinksActionTypes, LinksActionTypes } from '../actions/loadSearchedLinksData/loadSearchedLinksData';

interface LinksState {
  data: SearchedLink[] | [],
  error: string,
  loading: boolean,
}

const initialState: LinksState = {
  data: [],
  error: '',
  loading: false,
};

const searchedLinks = (state = initialState, action: LinksActionTypes)
: LinksState => {
  switch (action.type) {
    case LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_DATA:
      return {
        loading: true,
        data: [],
        error: '',
      };
    case LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    default:
      return state;
  }
};

export default searchedLinks;
