import { combineReducers } from 'redux';
import links from './links';
import link from './link';
import searchedLinks from './searchedLinks';
import searchedLink from './searchedLink';
import user from './authorization';

const root = combineReducers({
  links,
  link,
  searchedLinks,
  searchedLink,
  user,
});

export type RootState = ReturnType<typeof root>;

export default root;
