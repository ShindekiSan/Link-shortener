import React, {
  Suspense, lazy, FC, useEffect,
} from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import getCurrentUser from '../store/actions/authorizeUser/getCurrentUser';
import '../styles/app.css';
import '../styles/normalize.css';
import Loader from './UI/Loader';
import { RootState, history } from '../store/reducers/root';

const LogIn = lazy(() => import('../containers/AuthPage/LogInContainer/LogInContainer'));
const SignUp = lazy(() => import('../containers/AuthPage/SignUpContainer/SignUpContainer'));
const MainPage = lazy(() => import('./MainPage/MainPage'));
const Profile = lazy(() => import('./ProfilePage/Profile'));
const LinkDetails = lazy(() => import('./ProfilePage/LinkDetails'));
const ShortenerPage = lazy(() => import('./ShortenerPage/ShortenerPage'));
const SearchLinksPage = lazy(() => import('./SearchLinksPage/SearchLinksPage'));
const SearchedLinkDetails = lazy(() => import('./SearchLinksPage/SearchedLinkDetails'));

const App:FC = function () {
  const [cookies] = useCookies(['user']);
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data?.data?.userId && cookies.user) {
      dispatch(getCurrentUser(cookies.user));
    }
  }, [data?.data?.userId]);

  return (
    <Suspense fallback={<Loader />}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/link-detail/:id">
            <LinkDetails />
          </Route>
          <Route path="/shortener">
            <ShortenerPage />
          </Route>
          <Route path="/search">
            <SearchLinksPage />
          </Route>
          <Route path="/link-info/:id">
            <SearchedLinkDetails />
          </Route>
        </Switch>
      </ConnectedRouter>
    </Suspense>
  );
};

export default App;
