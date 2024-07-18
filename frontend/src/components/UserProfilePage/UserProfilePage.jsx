import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './UserProfilePage.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { api } from '../../_utils/api.js';

const UserProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  useEffect(() => {
    if (user) {
      fetchUserQuestions();
      fetchUserCommentsCount();
      fetchUserLikesCount();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await api().get(`/users/username/${username}`);
      setUser(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserQuestions = async () => {
    try {
      const response = await api().get(`/questions?authorUsername=${username}`);
      setQuestions(response.data.questions);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchUserCommentsCount = async () => {
    try {
      const response = await api().get(`/users/${user._id}/comments-count`);
      setCommentsCount(response.data.commentsCount);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchUserLikesCount = async () => {
    try {
      const response = await api().get(`/users/${user._id}/likes-count`);
      setLikesCount(response.data.likesCount);
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
        <div className={styles.userProfileSummary}>
          <h2>Summary</h2>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <p>Questions: </p>
              {questions.length === 0 ? (
                <p className={styles.noQuestionsText}>No questions asked.</p>
              ) : (
                <ul className={styles.questionsList}>
                  {questions.map((question) => (
                    <li key={question._id}>
                      <a href={`/questions/${question._id}`} className={styles.questionLink}>
                        {question.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.summaryItem}>
              <p>
                <span className={styles.commentsLabel}>Comments:</span>{' '}
                <span className={styles.commentsCount}>{commentsCount}</span>
              </p>
            </div>
            <div className={styles.summaryItem}>
              <p>
                <span className={styles.likesLabel}>Likes:</span>{' '}
                <span className={styles.likesCount}>{likesCount}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
