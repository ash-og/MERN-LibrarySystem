import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../../Services/AuthService";
import {AuthContext} from "../../Context/AuthContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Credit @ Bootstrap && https://www.youtube.com/watch?v=lvTAwTEwr2g


const Navigationbar = props =>{
    const {isAuthenticated,setIsAuthenticated,setUser} = useContext(AuthContext);

    const navigate = useNavigate();
    
    const onClickLogoutHandler = ()=>{
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
                navigate('/')
            }
        });
    }

    const unauthenticatedNavBar = ()=>{
        return (
            <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link> 
            </>
        )
    }

    const authenticatedNavBar = ()=>{
        return(
            <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile">My Profile</Nav.Link>
                <Nav.Link href="/reservations">Reservations</Nav.Link>
                <Nav.Item>
                    <button type="button" 
                            className="btn btn-link nav-item nav-link" 
                            onClick={onClickLogoutHandler}>Logout</button>
                </Nav.Item>
            </>
        )
    }
    return(
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">LB Library</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigationbar;