import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Returns read only list of users with an edit button

const UserDetails = ({ user, handleEditToggle }) => {
    return (
        <Container>
            <Row>
                <Col><h1 className="text-center">Welcome to your profile</h1></Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={`${user.image}`} alt='avatar' className="img-fluid img-thumbnail" />
                    </div>
                </Col>
                <Col xs={6}>
                    <div className="card" style={{width: '25rem'}}>
                        <div className="card-body">
                            <Row>
                                <Col sm="9">
                                    <p className="card-text" >Username </p>
                                </Col>
                                <Col>
                                    <p className="card-text text-muted">{user.username}</p>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm="6">
                                    <p className="card-text" >Email </p>
                                </Col>
                                <Col>
                                    <p className="card-text text-muted">{user.email}</p>
                                </Col>
                            </Row>
                            <hr />
                            <Row className="justify-content-md-center">
                                <Col className="text-center">
                                    <button type="button" className="btn btn-dark btn-md" onClick={(event)=> handleEditToggle(event, user)}>Edit Details</button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
      </Container>
    );
};

export default UserDetails