import React, {
  Suspense, lazy, FC, useEffect,
} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import getCurrentUser from '../store/actions/authorizeUser/getCurrentUser';
import '../styles/app.css';
import '../styles/normalize.css';
import Loader from './UI/Loader';
import { RootState } from '../store/reducers/root';

const LogIn = lazy(() => import('../containers/AuthPage/LogInContainer/LogInContainer'));
const SignUp = lazy(() => import('../containers/AuthPage/SignUpContainer/SignUpContainer'));
const MainPage = lazy(() => import('./MainPage/MainPage/MainPage'));
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
  );
};

export default App;
