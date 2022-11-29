import React from "react"
import styles from '../App.css';
import SearchBooks from "../components/Searchbar/SearchBooks";
// import background from "../assets/Library2.jpg"

 const Home = () => {

    // const myStyle={
    //     backgroundImage: `url(${background})`,
    //     height:'100vh',
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     };
    return (
        <div>
            <h1>
                Welcome to Bobo Library
            </h1>
            <SearchBooks />
        </div>
    )
}

export default Home