import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import UserItem from './UserItem/UserItem';
import FilterSearchBar from '../FilterSeachBar/FilterSearchBar';
import styles from './UserPage.module.css';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
        setFilteredUsers(response.data); // Initially show all users
      } catch (error) {
        setError(error.response ? error.response.data : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFilter = (searchWord) => {
    const newFilter = users.filter((user) => {
      return user.username.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredUsers(newFilter);
  };

  if (loading) {
    return <div className={styles.loadingBackground}>Loading...</div>;
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
      <FilterSearchBar placeholder='Filter by username' onFilter={handleFilter} />
      <div className={styles.container}>
        {filteredUsers.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
