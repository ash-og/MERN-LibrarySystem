import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Message from '../Message';
import { useNavigate } from 'react-router-dom';

const DeleteUser = () => {
  const [show, setShow] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    
    try {
        fetch('/user/deleteuser', {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStatusMessage('User Deleted');
                setShow(false);
                navigate('/');
            });
    } catch (err) {
        // Remediation logic
        setStatusMessage('There was an error deleting this profile');
        setShow(false);
    }

  }

  //   Credit @ https://react-bootstrap.github.io/components/modal/

  return (
    <>
      <Button variant="dark md" onClick={handleShow}>
        Delete Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are about to delete your profile. Are you sure you want to continue?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;