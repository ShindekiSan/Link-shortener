import axios from 'axios';
import { SearchedLink, SearchedLinkData } from '../../../types/link';

const API_URL = 'http://localhost:5000';

export const fetchLinks = async (tag: string):Promise<SearchedLink[]> => {
  const data = await axios({
    url: `${API_URL}/api/link/search/${tag}`,
    method: 'GET',
    params: {
      tagName: tag,
    },
  });
  return data.data.links;
};

export const fetchLink = async (linkId: string | undefined):Promise<SearchedLinkData> => {
  const fetched = await axios({
    url: `${API_URL}/api/link/link-info/${linkId}`,
    method: 'GET',
    params: {
      id: linkId,
    },
  });
  return { data: fetched.data.link };
};
