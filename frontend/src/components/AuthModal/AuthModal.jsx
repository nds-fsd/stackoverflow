import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import styles from './AuthModal.module.css';
import { setUserSession } from '../../_utils/localStorage.utils.js';

const AuthModal = ({ show, handleClose, isLogin }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };

    if (!isLogin) {
      userData.username = username;
    }

    try {
      const url = isLogin ? 'http://localhost:3001/auth/login' : 'http://localhost:3001/auth/register';
      const response = await axios.post(url, userData);

      if (response.status === 200 || response.status === 201) {
        const sessionData = {
          token: response.data.token,
          user: response.data.user,
        };
        setUserSession(sessionData);
        console.log('Storing session data:', sessionData); // Log for debugging
        setError(null); // Clear error message on successful login/registration
        handleClose();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className={styles.popup}>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login' : 'Sign In'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter your email'
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          {!isLogin && (
            <Form.Group controlId='formBasicUserName'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                placeholder='Enter your username'
                required
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Enter your password'
              required
              onChange={(event) => setPassword(event.target.value)}
            />
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
