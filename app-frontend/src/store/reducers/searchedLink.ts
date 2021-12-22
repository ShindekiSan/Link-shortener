import initialState from '../initialState';
import { SearchedLinkData } from '../../types/link';

enum ActionTypes {
  LOAD_SEARCHED_LINK_SUCCESS = 'LOAD_SEARCHED_LINK_SUCCESS',
  LOAD_SEARCHED_LINK_FAILED = 'LOAD_SEARCHED_LINK_FAILED',
  LOAD_SEARCHED_LINK_DATA = 'LOAD_SEARCHED_LINK_DATA',
}

interface LinkState {
  data: {} | SearchedLinkData,
  loading: boolean,
  error: null | string,
}

interface FetchSearchedLinkAction {
  type: ActionTypes.LOAD_SEARCHED_LINK_DATA,
}

interface FetchSearchedLinkActionSuccess {
  type: ActionTypes.LOAD_SEARCHED_LINK_SUCCESS,
  payload: SearchedLinkData,
}

interface FetchSearchedLinkActionFailed {
  type: ActionTypes.LOAD_SEARCHED_LINK_FAILED,
  payload: string,
}

type LinkAction =
  | FetchSearchedLinkAction
  | FetchSearchedLinkActionSuccess
  | FetchSearchedLinkActionFailed;

const searchedLink = (state = initialState.searchedLink, action: LinkAction): LinkState => { // eslint-disable-line
  switch (action.type) {
    case ActionTypes.LOAD_SEARCHED_LINK_DATA:
      return {
        loading: true,
        data: {},
        error: null,
      };
    case ActionTypes.LOAD_SEARCHED_LINK_FAILED:
      return {
        loading: false,
        data: {},
        error: action.payload,
      };
    case ActionTypes.LOAD_SEARCHED_LINK_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default searchedLink;
