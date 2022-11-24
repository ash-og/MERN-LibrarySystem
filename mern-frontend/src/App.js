import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import "./index.css";
import Navbar from "./components/Navigation/Navbar";
import Home from "./pages/Home/Home";
import SearchBooks from "./components/Searchbar/SearchBooks";

export default function App() {
  return (
      <Router>
          <Navbar />
          <Route exact path='/' component={Home} />
      </Router>
  );
}