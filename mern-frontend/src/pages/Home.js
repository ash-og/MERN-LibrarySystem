import React from "react"
import SearchBooks from "../components/Searchbar/SearchBooks";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import background from "../assets/Library3.jpg"

 const Home = () => {
    return (
        <Container>
            <Row style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover',}}>
                <Col> 
                    <h1 className="display-3">
                        Welcome to Leighlin Library
                    </h1>
                </Col>
            </Row>
            <Row>
                <SearchBooks />
            </Row>
        </Container>
    )
}

export default Home