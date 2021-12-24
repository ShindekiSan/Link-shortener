import { SearchedLinkData } from '../../types/link';
import { LoadSearchedLinkActionTypes, LinkActionTypes } from '../actions/loadSearchedLinkData/loadSearchedLinkData';

interface LinkState {
  data: SearchedLinkData,
  loading: boolean,
  error: string,
}

const initialState: LinkState = {
  data: {},
  loading: false,
  error: '',
};

const searchedLink = (state = initialState, action: LinkActionTypes): LinkState => {
  switch (action.type) {
    case LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_DATA:
      return {
        loading: true,
        data: {},
        error: '',
      };
    case LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_FAILED:
      return {
        loading: false,
        data: {},
        error: action.payload,
      };
    case LoadSearchedLinkActionTypes.LOAD_SEARCHED_LINK_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    default:
      return state;
  }
};

export default searchedLink;
