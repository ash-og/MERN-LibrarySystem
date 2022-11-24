import React, { useContext } from "react";
import {Link} from 'react-router-dom';
import AuthService from "../../Services/AuthService";
import {AuthContext} from "../../Context/AuthContext";
import { authenticate } from "passport";

// Credit @ Bootstrap

const Navbar = props => {
    const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(AuthContext)

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNav = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/login">
                    <li className="nav-item nav-link">
                        Login
                    </li>
                </Link>
                <Link to="/register">
                    <li className="nav-item nav-link">
                        Register
                    </li>
                </Link>                
            </>
        )};

    const authenticatedNav = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/profile">
                    <li className="nav-item nav-link">
                        My Profile
                    </li>
                </Link>
                {/* {
                    userrole === admin ?
                    <Link to="/admin">
                        <li className="nav-item nav-link">
                            Admin
                        </li>
                    </Link> : null
                } */}
                <button type="button" className="btn btn-link nav-item nav-link" onClick={onClickLogoutHandler}>
                    Logout
                </button>
            </>
        )};

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
                <div className="navbar-brand">Bobo Tatty</div>            
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    { !isAuthenticated ? unauthenticatedNav() : authenticatedNav() }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;