import React, {
  Suspense, lazy, useMemo, FC, useEffect,
} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import getCurrentUser from '../store/actions/authorizeUser/getCurrentUser';
import useTypedSelector from '../hooks/typedSelector.hook';
import useAuth from '../hooks/auth.hook';
import AuthContext, { ContextValue } from '../context/AuthContext';
import '../styles/app.css';
import '../styles/normalize.css';
import Loader from './UI/Loader';

const LogIn = lazy(() => import('../containers/AuthPage/LogInContainer'));
const SignUp = lazy(() => import('../containers/AuthPage/SignUpContainer'));
const MainPage = lazy(() => import('./MainPage/MainPage'));
const Profile = lazy(() => import('./ProfilePage/Profile'));
const LinkDetails = lazy(() => import('./ProfilePage/LinkDetails'));
const ShortenerPage = lazy(() => import('./ShortenerPage/ShortenerPage'));
const SearchLinksPage = lazy(() => import('./SearchLinksPage/SearchLinksPage'));
const SearchedLinkDetails = lazy(() => import('./SearchLinksPage/SearchedLinkDetails'));

const App:FC = function () {
  const {
    token, login, logout, userName, userId,
  } = useAuth();
  const isAuthenticated:boolean = !!token;
  const [cookies, setCookie] = useCookies(['user']);
  const { data } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  const authValue: ContextValue = useMemo(() => (
    {
      userId, token, login, logout, userName, isAuthenticated,
    }
  ), [userId, token, login, logout, userName, isAuthenticated]);

  useEffect(() => {
    if (data.userId && cookies.user === undefined) {
      setCookie('user', data.userId, { path: '/' });
    } else if (!data.userId && cookies.user) {
      dispatch(getCurrentUser(cookies.user));
    }
  }, [data.userId]);

  return (
    <AuthContext.Provider value={authValue}>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/link-detail/:id" element={<LinkDetails />} />
            <Route path="/shortener" element={<ShortenerPage />} />
            <Route path="/search" element={<SearchLinksPage />} />
            <Route path="/link-info/:id" element={<SearchedLinkDetails />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </AuthContext.Provider>
  );
};

export default App;
