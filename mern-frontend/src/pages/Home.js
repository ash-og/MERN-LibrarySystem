import React from "react"
import SearchBooks from "../components/Searchbar/SearchBooks";
// import background from "../assets/Library2.jpg"

 const Home = () => {
    return (
        <div>
            <h1 className="display-3">
                Welcome to Leighlin Library
            </h1>
            <SearchBooks />
        </div>
    )
}

export default Home