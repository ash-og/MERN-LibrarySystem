import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Returns editable inputs for the selected user 

const EditUser = ({user, setUser, setEditing}) => {
    const [statusMessage, setStatusMessage] = useState('');
    const [updateUserData, setUpdateUserData] = useState({
        username: user.username,
        email: user.email,
        image: user.image
    })

    const handleUpdateUserChange = (event) => {
        event.preventDefault();
        setStatusMessage('');

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value

        const newFormData = { ...updateUserData };
        newFormData[fieldName] = fieldValue
        console.log(newFormData);

        setUpdateUserData(newFormData);

    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const updatedUser = {
            username: updateUserData.username,
            email: updateUserData.email,
            image: updateUserData.image
        }

        try {
            fetch('/user/updateuser', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(updatedUser)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setStatusMessage('Details updated');
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error creating the user');
        }

        setUser(updatedUser);
        setEditing(false);
    };

    const handleCancelClick = () => {
        setEditing(false);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div className="card" style={{ width: '18rem' }}>
                        <input
                            type="text"
                            name="image"
                            className="form-control"
                            placeholder=""
                            value={updateUserData.image}
                            onChange={handleUpdateUserChange}
                        />
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
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder=""
                                        value={updateUserData.username}
                                        onChange={handleUpdateUserChange}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm="6">
                                    <p className="card-text" >Email </p>
                                </Col>
                                <Col>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder=""
                                        value={updateUserData.email}
                                        onChange={handleUpdateUserChange}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row className="justify-content-md-center">
                                <Col className="text-center">
                                         <button className="btn btn-dark btn-md" type="submit" onClick={handleEditFormSubmit}>
                                            Save
                                        </button>
                                        <button className="btn btn-dark btn-md" type='button' onClick={handleCancelClick}>Cancel</button>
                                        <p className="text-red-900">
                                            { statusMessage }
                                        </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
      </Container>




        //     <td>
        //         <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleEditFormSubmit}>
        //             Save
        //         </button>
        //         <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='button' onClick={handleCancelClick}>Cancel</button>
        //         <p className="text-red-900">
        //             { statusMessage }
        //         </p>
        //     </td>
        // </tr>

    );
};

export default EditUser