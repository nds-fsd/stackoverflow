import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './AuthModal.module.css';

const AuthModal = ({ show, handleClose, isLogin }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    let requestBody = {
      email,
      password,
    };

    try {
      const response = await fetch(
        isLogin ? 'http://localhost:3001/auth/login' : 'http://localhost:3001/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(isLogin ? 'Login successful:' : 'Signed in successfully:', data);
        handleClose();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className={styles.popup}>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login' : 'Sign In'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' name='email' placeholder='Enter your email' required />
          </Form.Group>

          {!isLogin && (
            <Form.Group controlId='formBasicUserName'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' name='username' placeholder='Enter your username' required />
            </Form.Group>
          )}

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' placeholder='Enter your password' required />
          </Form.Group>

          <Button variant='primary' type='submit'>
            {isLogin ? 'Login' : 'Sign in'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
