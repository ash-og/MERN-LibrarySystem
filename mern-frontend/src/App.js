import './App.css';
import "./index.css";
import Navbar from "./components/Navigation/Navbar";
import SearchBooks from "./components/Searchbar/SearchBooks";

export default function App() {
  return (
      <div>
          <div><Navbar></Navbar></div>
          <div><SearchBooks></SearchBooks></div>
      </div>
  )
}