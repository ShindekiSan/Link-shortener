import React from 'react';
import ReactDOM  from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import SignUp from '../src/components/AuthPage/SignUp';
import LogIn from '../src/components/AuthPage/LogIn'

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path ='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)