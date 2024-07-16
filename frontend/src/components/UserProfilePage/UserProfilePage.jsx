import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './UserProfilePage.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const UserProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
    fetchUserQuestions();
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/username/${username}`);
      setUser(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/questions?authorUsername=${username}`);
      setQuestions(response.data.questions);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.userProfileContainer}>
        <div className={styles.userProfileHeader}>
          <img src={user.profile_picture} alt='Profile' className={styles.profilePicture} />
          <h1 className={styles.username}>{user.username}</h1>
        </div>
        <div className={styles.userProfileDetails}>
          <div className={styles.userProfileSection}>
            <h2>Reputation</h2>
            <div className={styles.detail}>
              <img src='/assets/icons/reputation.svg' alt='Reputation Icon' />
              <p>{user.reputation}</p>
            </div>
          </div>
          <div className={styles.userProfileSection}>
            <h2>Member Since</h2>
            <div className={styles.detail}>
              <img src='/assets/icons/membership.svg' alt='Membership Icon' />
              <p>{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className={styles.userProfileQuestions}>
          <h2>Questions</h2>
          {questions.length === 0 ? (
            <p>No questions asked.</p>
          ) : (
            <ul>
              {questions.map((question) => (
                <li key={question._id}>
                  <a href={`/questions/${question._id}`}>{question.title}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
