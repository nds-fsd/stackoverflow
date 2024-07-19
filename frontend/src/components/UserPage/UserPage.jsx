import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import UserItem from './UserItem/UserItem';
import FilterSearchBar from '../FilterSeachBar/FilterSearchBar';
import styles from './UserPage.module.css';
import { api } from '../../_utils/api.js';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('name'); // Default sorting criteria

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api().get('/users');
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

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    let sortedUsers = [...filteredUsers];
    if (criteria === 'name') {
      sortedUsers.sort((a, b) => a.username.localeCompare(b.username));
    } else if (criteria === 'ranking') {
      sortedUsers.sort((a, b) => b.reputation - a.reputation);
    }
    setFilteredUsers(sortedUsers);
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
      <div className={styles.filterContainer}>
        <FilterSearchBar placeholder='Filter by username' onFilter={handleFilter} />
        <div className={styles.sortOptionsContainer}>
          <div className={styles.sortOptions}>
            <button
              className={`${styles.sortButton} ${sortCriteria === 'name' ? styles.active : ''}`}
              onClick={() => handleSortChange('name')}
            >
              Name
            </button>
            <button
              className={`${styles.sortButton} ${sortCriteria === 'ranking' ? styles.active : ''}`}
              onClick={() => handleSortChange('ranking')}
            >
              Ranking
            </button>
          </div>
        </div>
      </div>
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
