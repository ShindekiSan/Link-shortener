import configureStore from 'redux-mock-store';
import { LinkState } from '../../store/reducers/link';
import { UserState } from '../../store/reducers/authorization';
import { LinksState } from '../../store/reducers/links';
import { SearchedLinkState } from '../../store/reducers/searchedLink';
import { SearchedLinksState } from '../../store/reducers/searchedLinks';

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
