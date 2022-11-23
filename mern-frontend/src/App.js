import './App.css';
import "./index.css";
import Navbar from "./components/Navigation/Navbar";
import SearchBooks from "./components/Searchbar/SearchBooks";

export default function App() {
  return (
      <div>
          <div><Navbar></Navbar></div>
          <h1>Welcome to Local Library</h1>
          <div><SearchBooks></SearchBooks></div>
      </div>
  )
}