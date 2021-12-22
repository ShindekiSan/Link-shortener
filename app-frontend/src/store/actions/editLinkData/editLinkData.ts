import { EDIT_LINK_DATA } from '../../contants';
import { LinkEditData } from '../../../types/link';

const editLinkData = (linkData: LinkEditData) => ({
  type: EDIT_LINK_DATA,
  payload: linkData,
});

export default editLinkData;
