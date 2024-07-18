import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './AuthModal.module.css';
import { setUserSession } from '../../_utils/localStorage.utils';
import { api } from '../../_utils/api.js';

const AuthModal = ({ show, handleClose, isLogin, onAuthSuccess }) => {
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
      const url = isLogin ? '/auth/login' : '/auth/register';
      const response = await api().post(url, userData);

      if (response.status === 200 || response.status === 201) {
        const sessionData = {
          token: response.data.token,
          user: response.data.user,
        };
        setUserSession(sessionData);
        setError(null);
        onAuthSuccess();
        handleClose();
        window.dispatchEvent(new Event('authChange'));
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName={styles.modal}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>{isLogin ? 'Login' : 'Sign Up'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {error && <p className={styles.error}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label className={styles.formLabel}>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter your email'
              required
              onChange={(event) => setEmail(event.target.value)}
              className={styles.formControl}
            />
          </Form.Group>

          {!isLogin && (
            <Form.Group controlId='formBasicUserName'>
              <Form.Label className={styles.formLabel}>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                placeholder='Enter your username'
                required
                onChange={(event) => setUsername(event.target.value)}
                className={styles.formControl}
              />
            </Form.Group>
          )}

          <Form.Group controlId='formBasicPassword'>
            <Form.Label className={styles.formLabel}>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Enter your password'
              required
              onChange={(event) => setPassword(event.target.value)}
              className={styles.formControl}
            />
          </Form.Group>

          <Button type='submit' className={styles.submitButton}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
