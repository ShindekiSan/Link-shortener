import { Link, SearchedLink } from './link';

export interface InitialState {
  links: {
    data: Link[],
  },
  link: {
    data: Link | {},
  },
  searchedLinks: {
    data: SearchedLink[],
  },
  searchedLink: {
    data: SearchedLink | {},
  },
}
