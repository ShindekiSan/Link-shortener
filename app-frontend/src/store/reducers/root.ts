import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import links from './links';
import link from './link';
import searchedLinks from './searchedLinks';
import searchedLink from './searchedLink';
import user from './authorization';

export const history = createBrowserHistory();

const root = combineReducers({
  router: connectRouter(history),
  links,
  link,
  searchedLinks,
  searchedLink,
  user,
});

export type RootState = ReturnType<typeof root>;

export default root;
