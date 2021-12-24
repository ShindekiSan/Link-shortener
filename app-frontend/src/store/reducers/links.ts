import { Link } from '../../types/link';
import { LoadLinksActionTypes, LinksActionTypes } from '../actions/loadLinksData/loadLinksData';

interface LinksState {
  data: [] | Link[],
  error: string,
  loading: boolean,
}

const initialState: LinksState = {
  data: [],
  error: '',
  loading: false,
};

const links = (state = initialState, action: LinksActionTypes): LinksState => {
  switch (action.type) {
    case LoadLinksActionTypes.LOAD_LINKS_DATA:
      return {
        loading: true,
        error: '',
        data: [],
      };
    case LoadLinksActionTypes.LOAD_LINKS_FAILED:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case LoadLinksActionTypes.LOAD_LINKS_SUCCESS:
      return {
        data: action.payload,
        error: '',
        loading: false,
      };
    default:
      return state;
  }
};

export default links;
