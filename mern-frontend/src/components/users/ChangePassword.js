import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Message from '../Message';
import { useNavigate } from 'react-router-dom';

const ChangePassword = props => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('')
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{

  })

  const handleClose = () => {
    setPassword('');
    setShow(false);
};
  const handleShow = () => {
    setShow(true);
};

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {

    let password = {
      password: password,
    }

    try {
        fetch('/user/updatepassword', {
          method: "POST",
          headers: {
              'Content-Type': "application/json"
          },
          body: JSON.stringify(password)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStatusMessage('Password modified reserved');
                setPassword('');
                setShow(false);
                navigate('/login');
            });
    } catch (err) {
        // Remediation logic
        setStatusMessage('There was an error changing this password');
        setShow(false);
    }

  }

  //   Credit @ https://react-bootstrap.github.io/components/modal/

  return (
    <>
        
        <Button variant="dark md" onClick={handleShow}>
            Reset Password
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="md-form mb-5">
                    <label htmlFor="password" className="sr-only">Password: </label>
                        <input type="password" 
                            name="password" 
                            onChange={handlePasswordChange} 
                            className="form-control" 
                            placeholder="Please enter password"/>      
                </div>
                <div>
                    {statusMessage ? <Message message={statusMessage} /> : null }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handlePasswordSubmit}>
                    Save Password
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default ChangePassword;