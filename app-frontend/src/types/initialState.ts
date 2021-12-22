import { Link, SearchedLink } from './link';
import { UserInterface } from './user';

export interface InitialState {
  links: {
    data: Link[],
    loading: boolean,
    error: null | string,
  },
  link: {
    data: Link,
    loading: boolean,
    error: null | string,
  },
  searchedLinks: {
    data: SearchedLink[],
    loading: boolean,
    error: null | string,
  },
  searchedLink: {
    data: SearchedLink | {},
    loading: boolean,
    error: null | string,
  },
  user: {
    data: UserInterface,
    loading: boolean,
    error: null | string,
  },
}
