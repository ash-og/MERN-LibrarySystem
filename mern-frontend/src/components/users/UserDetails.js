import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DeleteUser from "./DeleteUser";
import ChangePassword from './ChangePassword';

// Returns read only list of users with an edit button

const UserDetails = ({ user, handleEditToggle }) => {
    return (
        <>
                <Col>
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={`${user.image}`} alt='avatar' className="img-fluid img-thumbnail" />
                    </div>
                </Col>
                <Col xs={6}>
                    <div className="card" style={{width: '25rem'}}>
                        <div className="card-body">
                            <hr />
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
                                <Col>
                                    <ChangePassword />
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="justify-content-md-center">
                                <Col className="text-center">
                                    <DeleteUser />                                    
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
        </>
    );
};

export default UserDetails