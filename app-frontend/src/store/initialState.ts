import { InitialState } from '../types/initialState';
import { Link, SearchedLink } from '../types/link';
import { UserInterface } from '../types/user';

const initialState: InitialState = {
  links: {
    data: [] as Link[],
    loading: false,
    error: null,
  },
  link: {
    data: {} as Link,
    loading: false,
    status: '',
  },
  searchedLinks: {
    data: [] as SearchedLink[],
    loading: false,
    error: null,
  },
  searchedLink: {
    data: {} as SearchedLink,
    loading: false,
    error: null,
  },
  user: {
    data: {} as UserInterface,
    loading: false,
    error: null,
  },
};

export default initialState;
