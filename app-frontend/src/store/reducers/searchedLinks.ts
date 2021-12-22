import initialState from '../initialState';
import { SearchedLink } from '../../types/link';

enum ActionTypes {
  LOAD_SEARCHED_LINKS_SUCCESS = 'LOAD_SEARCHED_LINKS_SUCCESS',
  LOAD_SEARCHED_LINKS_FAILED = 'LOAD_SEARCHED_LINKS_FAILED',
  LOAD_SEARCHED_LINKS_DATA = 'LOAD_SEARCHED_LINKS_DATA',
}

interface LinksState {
  data: SearchedLink[] | [],
  error: null | string,
  loading: boolean,
}

interface FetchSearchedLinksAction {
  type: ActionTypes.LOAD_SEARCHED_LINKS_DATA,
}

interface FetchSearchedLinksSuccessAction {
  type: ActionTypes.LOAD_SEARCHED_LINKS_SUCCESS,
  payload: SearchedLink[],
}

interface FetchSearchedLinksFailedAction {
  type: ActionTypes.LOAD_SEARCHED_LINKS_FAILED,
  payload: string,
}

type LinksAction =
  | FetchSearchedLinksAction
  | FetchSearchedLinksSuccessAction
  | FetchSearchedLinksFailedAction;

const searchedLinks = (state = initialState.searchedLinks, action: LinksAction): LinksState => { // eslint-disable-line
  switch (action.type) {
    case ActionTypes.LOAD_SEARCHED_LINKS_DATA:
      return {
        loading: true,
        data: [],
        error: null,
      };
    case ActionTypes.LOAD_SEARCHED_LINKS_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ActionTypes.LOAD_SEARCHED_LINKS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default searchedLinks;
