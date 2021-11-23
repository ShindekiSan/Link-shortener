import React from 'react';
import LogIn from './AuthPage/LogIn';
import SignUp from './AuthPage/SignUp';
import MainPage from './MainPage/MainPage';
import Profile from './ProfilePage/Profile';
import LinkDetails from './ProfilePage/LinkDetails'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';
import { AuthContext } from '../context/AuthContext.js';
import '../styles/app.css';
import 'materialize-css';
import '../styles/normalize.css';
import ShortenerPage from './ShortenerPage/ShortenerPage';
import SearchLinksPage from './SearchLinksPage/SearchLinksPage';
import SearchedLinkDetails from './SearchLinksPage/SearchedLinkDetails'

function App () {
    const {token, login, logout, userName, userId} = useAuth()
    const isAuthenticated = !!token
    return (
        <AuthContext.Provider value={{
            userId, token, login, logout, userName, isAuthenticated
        }}>
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
        </AuthContext.Provider>
    )
}

export default App