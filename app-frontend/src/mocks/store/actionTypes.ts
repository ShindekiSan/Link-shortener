import { Link } from 'react-router-dom';
import { LinkData, SearchedLink, SearchedLinkData } from '../../types/link';
import { UserInterface } from '../../types/user';

interface RouterPayload {
  method: string,
  args: [],
}

export interface AuthorizationAction {
  type: string,
  payload?: {
    data: UserInterface
  } | RouterPayload,
}

export interface LinkAction {
  type: string,
  payload: LinkData | Link[]
}

export interface SearchedLinkAction {
  type: string,
  payload: SearchedLinkData | SearchedLink[],
}
