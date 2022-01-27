import axios from 'axios';
import {
  LinkData, Link, LinkEdit, AddLink, LinkId, SearchedLinkData, SearchedLink,
} from '../../../types/link';

const API_URL = 'https://links-shortener-api.herokuapp.com/';

export const fetchLinks = async (token: string):Promise<Link[]> => {
  const data = await axios({
    url: `${API_URL}/api/link`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.links;
};

export const fetchLink = async (linkParams: LinkId):Promise<LinkData> => {
  const fetched = await axios({
    url: `${API_URL}/api/link/${linkParams.id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${linkParams.token}`,
    },
    params: {
      id: linkParams.id,
    },
  });
  return { data: fetched.data.link };
};

export const fetchLinkEdit = async (linkParams: LinkEdit):Promise<LinkData> => {
  const fetched = await axios({
    url: `${API_URL}/api/link/edit`,
    method: 'POST',
    data: {
      description: linkParams.description,
      tags: linkParams.tags,
      code: linkParams.code,
    },
    headers: {
      Authorization: `Bearer ${linkParams.token}`,
    },
  });
  return { data: fetched.data.link };
};

export const fetchNewLink = async (linkParams: AddLink):Promise<LinkData> => {
  const fetched = await axios({
    url: `${API_URL}/api/link/generate`,
    method: 'POST',
    data: {
      from: linkParams.from,
      tags: linkParams.tags,
      description: linkParams.description,
    },
    headers: {
      Authorization: `Bearer ${linkParams.token}`,
    },
  });
  return { data: fetched.data };
};

export const fetchSearchedLinks = async (tag: string):Promise<SearchedLink[]> => {
  const fetched = await axios({
    url: `${API_URL}/api/link/search/${tag}`,
    method: 'GET',
  });
  return fetched.data.links;
};

export const fetchSearchedLink = async (id: string | undefined):Promise<SearchedLinkData> => {
  const fetched = await axios({
    url: `${API_URL}/api/link/link-info/${id}`,
    method: 'GET',
  });
  return { data: fetched.data.link };
};
