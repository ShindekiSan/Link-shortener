import initialState from '../initialState';
import { Link } from '../../types/link';

enum ActionTypes {
  LOAD_LINK_DATA = 'LOAD_LINK_DATA',
  LOAD_LINK_FAILED = 'LOAD_LINK_FAILED',
  LOAD_LINK_SUCCESS = 'LOAD_LINK_SUCCESS',
  EDIT_LINK_DATA = 'EDIT_LINK_DATA',
  EDIT_LINK_FAILED = 'EDIT_LINK_FAILED',
  EDIT_LINK_SUCCESS = 'EDIT_LINK_SUCCESS',
}

interface LinkState {
  data: Link,
  loading: boolean,
  error: null | string,
}

interface FetchLinkAction {
  type: ActionTypes.LOAD_LINK_DATA | ActionTypes.EDIT_LINK_DATA,
}

interface FetchLinkActionSuccess {
  type: ActionTypes.LOAD_LINK_SUCCESS | ActionTypes.EDIT_LINK_SUCCESS,
  payload: Link
}

interface FetchLinkActionFailed {
  type: ActionTypes.LOAD_LINK_FAILED | ActionTypes.EDIT_LINK_FAILED,
  payload: string,
}

type LinkAction = FetchLinkAction | FetchLinkActionFailed | FetchLinkActionSuccess;

const link = (state = initialState.link, action: LinkAction): LinkState => { // eslint-disable-line
  switch (action.type) {
    case ActionTypes.LOAD_LINK_DATA:
      return {
        loading: true,
        data: {} as Link,
        error: null,
      };
    case ActionTypes.LOAD_LINK_FAILED:
      return {
        loading: false,
        data: {} as Link,
        error: action.payload,
      };
    case ActionTypes.LOAD_LINK_SUCCESS:
      return {
        data: action.payload,
        error: null,
        loading: false,
      };
    case ActionTypes.EDIT_LINK_DATA:
      return {
        loading: true,
        data: {} as Link,
        error: null,
      };
    case ActionTypes.EDIT_LINK_FAILED:
      return {
        loading: false,
        data: {} as Link,
        error: action.payload,
      };
    case ActionTypes.EDIT_LINK_SUCCESS:
      return {
        loading: false,
        data: { ...state.data, ...action.payload },
        error: null,
      };
    default:
      return state;
  }
};

export default link;
