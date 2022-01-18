import { LinkData } from '../../types/link';
import { AddLinkActions } from '../actions/addLink/addLink';
import { EditLinkActions } from '../actions/editLinkData/editLinkData';
import { LoadLinkActions } from '../actions/loadLinkData/loadLinkData';
import { AddLinkActionTypes, EditLinkActionTypes, LoadLinkActionTypes } from '../actionTypes';

export const initialState: LinkState = {
  data: null,
  error: '',
  loading: false,
};

export interface LinkState {
  data: LinkData | null,
  loading: boolean,
  error: string,
}

type LinkActionTypes = AddLinkActions | LoadLinkActions | EditLinkActions;

const link = (state = initialState, action: LinkActionTypes): LinkState => {
  switch (action.type) {
    case LoadLinkActionTypes.LOAD_LINK_DATA:
      return {
        ...state,
        loading: true,
      };
    case LoadLinkActionTypes.LOAD_LINK_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LoadLinkActionTypes.LOAD_LINK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case EditLinkActionTypes.EDIT_LINK_DATA:
      return {
        loading: true,
        data: state.data,
        error: '',
      };
    case EditLinkActionTypes.EDIT_LINK_FAILED:
      return {
        loading: false,
        data: state.data,
        error: action.payload,
      };
    case EditLinkActionTypes.EDIT_LINK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case AddLinkActionTypes.ADD_LINK_DATA:
      return {
        ...state,
        loading: true,
      };
    case AddLinkActionTypes.ADD_LINK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case AddLinkActionTypes.ADD_LINK_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default link;
