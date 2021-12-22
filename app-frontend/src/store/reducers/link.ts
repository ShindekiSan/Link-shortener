import initialState from '../initialState';
import { Link } from '../../types/link';

enum ActionTypes {
  LOAD_LINK_DATA = 'LOAD_LINK_DATA',
  LOAD_LINK_FAILED = 'LOAD_LINK_FAILED',
  LOAD_LINK_SUCCESS = 'LOAD_LINK_SUCCESS',
  EDIT_LINK_DATA = 'EDIT_LINK_DATA',
  EDIT_LINK_FAILED = 'EDIT_LINK_FAILED',
  EDIT_LINK_SUCCESS = 'EDIT_LINK_SUCCESS',
  ADD_LINK_DATA = 'ADD_LINK_DATA',
  ADD_LINK_SUCCESS = 'ADD_LINK_SUCCESS',
  ADD_LINK_FAILED = 'ADD_LINK_FAILED',
}

interface LinkState {
  data: Link,
  loading: boolean,
  status: null | string,
}

interface FetchLinkAction {
  type: ActionTypes.LOAD_LINK_DATA | ActionTypes.EDIT_LINK_DATA | ActionTypes.ADD_LINK_DATA,
}

interface AddLinkSuccess {
  type: ActionTypes.ADD_LINK_SUCCESS,
  payload: string,
}

interface FetchLinkActionSuccess {
  type: ActionTypes.LOAD_LINK_SUCCESS | ActionTypes.EDIT_LINK_SUCCESS,
  payload: Link
}

interface FetchLinkActionFailed {
  type: ActionTypes.LOAD_LINK_FAILED | ActionTypes.EDIT_LINK_FAILED | ActionTypes.ADD_LINK_FAILED,
  payload: string,
}

type LinkAction = FetchLinkAction | FetchLinkActionFailed | FetchLinkActionSuccess | AddLinkSuccess;

const link = (state = initialState.link, action: LinkAction): LinkState => { // eslint-disable-line
  switch (action.type) {
    case ActionTypes.LOAD_LINK_DATA:
      return {
        loading: true,
        data: {} as Link,
        status: '',
      };
    case ActionTypes.LOAD_LINK_FAILED:
      return {
        loading: false,
        data: {} as Link,
        status: action.payload,
      };
    case ActionTypes.LOAD_LINK_SUCCESS:
      return {
        data: action.payload,
        status: '',
        loading: false,
      };
    case ActionTypes.EDIT_LINK_DATA:
      return {
        loading: true,
        data: state.data,
        status: '',
      };
    case ActionTypes.EDIT_LINK_FAILED:
      return {
        loading: false,
        data: state.data,
        status: action.payload,
      };
    case ActionTypes.EDIT_LINK_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        status: '',
      };
    case ActionTypes.ADD_LINK_DATA:
      return {
        loading: true,
        data: {} as Link,
        status: '',
      };
    case ActionTypes.ADD_LINK_SUCCESS:
      return {
        loading: false,
        data: {} as Link,
        status: action.payload,
      };
    case ActionTypes.ADD_LINK_FAILED:
      return {
        loading: false,
        data: {} as Link,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default link;
