import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import "./index.css";

export default function App() {
  const { user,setUser,isAuthenticated,setIsAuthenticated } = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);
  return (
    <p>Placeholder</p>
  )
}