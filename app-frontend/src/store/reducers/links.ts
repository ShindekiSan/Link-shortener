import { Link } from '../../types/link';
import { LinksActionTypes } from '../actions/loadLinksData/loadLinksData';
import { LoadLinksActionTypes } from '../actionTypes';

export interface LinksState {
  data: null | Link[],
  error: string,
  loading: boolean,
}

export const initialState: LinksState = {
  data: null,
  error: '',
  loading: false,
};

const links = (state = initialState, action: LinksActionTypes): LinksState => {
  switch (action.type) {
    case LoadLinksActionTypes.LOAD_LINKS_DATA:
      return {
        ...state,
        loading: true,
      };
    case LoadLinksActionTypes.LOAD_LINKS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadLinksActionTypes.LOAD_LINKS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default links;
