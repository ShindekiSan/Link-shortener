import { LinkData } from '../../types/link';
import { AddLinkActionTypes, AddLinkActions } from '../actions/addLink/addLink';
import { EditLinkActionTypes, EditLinkActions } from '../actions/editLinkData/editLinkData';
import { LoadLinkActionTypes, LoadLinkActions } from '../actions/loadLinkData/loadLinkData';

const initialState: LinkState = {
  data: {},
  error: '',
  loading: false,
};

interface LinkState {
  data: LinkData,
  loading: boolean,
  error: string,
}

type LinkActionTypes = AddLinkActions | LoadLinkActions | EditLinkActions;

const link = (state = initialState, action: LinkActionTypes): LinkState => {
  switch (action.type) {
    case LoadLinkActionTypes.LOAD_LINK_DATA:
      return {
        loading: true,
        data: {},
        error: '',
      };
    case LoadLinkActionTypes.LOAD_LINK_FAILED:
      return {
        loading: false,
        data: {},
        error: action.payload,
      };
    case LoadLinkActionTypes.LOAD_LINK_SUCCESS:
      return {
        data: action.payload,
        error: '',
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
        loading: false,
        data: action.payload,
        error: '',
      };
    case AddLinkActionTypes.ADD_LINK_DATA:
      return {
        loading: true,
        data: {},
        error: '',
      };
    case AddLinkActionTypes.ADD_LINK_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    case AddLinkActionTypes.ADD_LINK_FAILED:
      return {
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default link;
