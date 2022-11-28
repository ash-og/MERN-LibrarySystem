import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "./index.css";
import Navbar from "./components/Navigation/Navbar";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/SignUp';
// import SearchBooks from "./components/Searchbar/SearchBooks";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}