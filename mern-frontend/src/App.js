import React, {useContext} from 'react';
import { AuthContext } from './Context/AuthContext';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import "./index.css";
import Navigationbar from "./components/Navigation/Navbar";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/SignUp';
import Profile from './pages/Profile';
import Reserve from './pages/Reserve';

export default function App() {
    const { isAuthenticated} = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Navigationbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile' element={ !isAuthenticated ? <Navigate to='/login' /> : <Profile /> } />
                <Route path='/reservations' element={ !isAuthenticated ? <Navigate to='/login' /> : <Reserve /> } />
            </Routes>
        </BrowserRouter>

    );
}