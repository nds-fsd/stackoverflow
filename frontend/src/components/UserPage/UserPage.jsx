import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import UserItem from './UserItem/UserItem';
import UserFilterSearchBar from './UserFilterSearchBar/UserFilterSearchBar';
import styles from './UserPage.module.css';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.descriptionContainer}>
        <h1 className={styles.descriptionTitle}>Users</h1>
        <p className={styles.descriptionText}>Explore user profiles and their contributions.</p>
      </div>
      <UserFilterSearchBar placeholder='Filter by username' />
      <div className={styles.container}>
        {users.map((user, index) => (
          <UserItem key={index} user={user} />
        ))}
      </div>
      <div className={styles.tagsPlaceholder}>
        <h2>Tags Placeholder</h2>
        <p>Tags will be displayed here.</p>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
