import { ADD_LINK_DATA, ADD_LINK_SUCCESS, ADD_LINK_FAILED } from '../../contants';
import { AddLink } from '../../../types/link';

const addLink = (link: AddLink) => ({
  type: ADD_LINK_DATA,
  payload: link,
});

export const addLinkFailed = (error: string) => ({
  type: ADD_LINK_FAILED,
  payload: error,
});

export const addLinkSuccess = (notify: string) => ({
  type: ADD_LINK_SUCCESS,
  payload: notify,
});

export default addLink;
