import React, { Suspense, lazy } from 'react';
const LogIn = lazy(() => import('./AuthPage/LogIn'));
const SignUp = lazy(() => import('./AuthPage/SignUp'));
const MainPage = lazy(() => import('./MainPage/MainPage'));
const Profile = lazy(() => import('./ProfilePage/Profile'));
const LinkDetails = lazy(() => import('./ProfilePage/LinkDetails'));
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';
import { AuthContext } from '../context/AuthContext.js';
import '../styles/app.css';
import '../styles/normalize.css';
const ShortenerPage = lazy(() => import('./ShortenerPage/ShortenerPage'));
const SearchLinksPage = lazy(() => import('./SearchLinksPage/SearchLinksPage'));
const SearchedLinkDetails = lazy(() => import('./SearchLinksPage/SearchedLinkDetails'));
import Loader from './UI/Loader';

function App () {
    const {token, login, logout, userName, userId} = useAuth()
    const isAuthenticated = !!token
    return (
        <AuthContext.Provider value={{
            userId, token, login, logout, userName, isAuthenticated
        }}>
            <Suspense fallback={<Loader />}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/login' element={<LogIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/link-detail/:id' element={<LinkDetails />} />
                        <Route path='/shortener' element={<ShortenerPage />} />
                        <Route path='/search' element={<SearchLinksPage />} />
                        <Route path='/link-info/:id' element={<SearchedLinkDetails />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </AuthContext.Provider>
    )
}

export default App