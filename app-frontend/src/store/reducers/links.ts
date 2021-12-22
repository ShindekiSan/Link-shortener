import initialState from '../initialState';
import { Link } from '../../types/link';

enum ActionTypes {
  LOAD_LINKS_SUCCESS = 'LOAD_LINKS_SUCCESS',
  LOAD_LINKS_FAILED = 'LOAD_LINKS_FAILED',
  LOAD_LINKS_DATA = 'LOAD_LINKS_DATA',
}

interface LinksState {
  data: [] | Link[],
  error: null | string,
  loading: boolean,
}

interface FetchLinksAction {
  type: ActionTypes.LOAD_LINKS_DATA,
}

interface FetchLinksSuccessAction {
  type: ActionTypes.LOAD_LINKS_SUCCESS,
  payload: Link[],
}

interface FetchLinksFailedAction {
  type: ActionTypes.LOAD_LINKS_FAILED,
  payload: string,
}

type LinksAction = FetchLinksAction | FetchLinksSuccessAction | FetchLinksFailedAction;

const links = (state = initialState.links, action: LinksAction): LinksState => { // eslint-disable-line
  switch (action.type) {
    case ActionTypes.LOAD_LINKS_DATA:
      return {
        loading: true,
        error: null,
        data: [],
      };
    case ActionTypes.LOAD_LINKS_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case ActionTypes.LOAD_LINKS_SUCCESS:
      return {
        data: action.payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default links;
