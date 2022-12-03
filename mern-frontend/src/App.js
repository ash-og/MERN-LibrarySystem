import React, {useContext} from 'react';
import { AuthContext } from './Context/AuthContext';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import "./index.css";
import Navbar from "./components/Navigation/Navbar";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/SignUp';
import Profile from './pages/Profile';

export default function App() {
    const { isAuthenticated, user} = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile' element={ !isAuthenticated ? <Navigate to='/login' /> : <Profile /> } />
            </Routes>
        </BrowserRouter>

    );
}