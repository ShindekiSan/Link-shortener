import { ADD_LINK_DATA, ADD_LINK_SUCCESS, ADD_LINK_FAILED } from '../../contants';
import { AddLinkData } from '../../../types/link';

const addLink = (link: AddLinkData) => ({
  type: ADD_LINK_DATA,
  payload: link,
});

export const addLinkFailed = (error: string) => ({
  type: ADD_LINK_FAILED,
  payload: error,
});

export const addLinkSuccess = (data: AddLinkData) => ({
  type: ADD_LINK_SUCCESS,
  payload: data,
});

export default addLink;
