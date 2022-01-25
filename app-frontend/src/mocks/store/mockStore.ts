import configureStore from 'redux-mock-store';
import { UserState } from '../../store/reducers/authorization';
import { LinksState } from '../../store/reducers/links';
import { SearchedLinkState } from '../../store/reducers/searchedLink';
import { SearchedLinksState } from '../../store/reducers/searchedLinks';

interface Link {
  code?: string,
  to?: string,
  from?: string,
  clicks?: number,
  tags?: {
    tagName: string,
    _id: string,
  }[],
  description?: string,
  _id?: string,
  date?: Date,
  message?: string,
}

interface LinkState {
  data: {
    data?: Link,
  } | null
  loading: boolean
  error: string
}

export interface InitialMockState {
  user?: UserState
  searchedLink?: SearchedLinkState
  searchedLinks?: SearchedLinksState
  links?: LinksState
  link?: LinkState
}

export function createMockStore(state: InitialMockState) { // eslint-disable-line
  const mockStore = configureStore();
  const store = mockStore(state);
  return store;
}
