import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import "./index.css";
import Navbar from "./components/Navigation/Navbar";
import SearchBooks from "./components/Searchbar/SearchBooks";

export default function App() {
  const { user,setUser,isAuthenticated,setIsAuthenticated } = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);
  return (
      <div>
          <div><Navbar></Navbar></div>
          <div><SearchBooks></SearchBooks></div>
      </div>
  )
}