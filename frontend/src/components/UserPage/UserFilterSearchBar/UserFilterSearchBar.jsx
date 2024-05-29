import React from 'react';
import styles from './UserFilterSearchBar.module.css';

const UserFilterSearchBar = ({ placeholder }) => {
  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        <img src='/assets/icons/search.svg' alt='Search Icon' className={styles.searchIcon} />
        <input type='text' placeholder={placeholder} className={styles.inputField} />
        <div className={styles.searchIcon}></div>
      </div>
    </div>
  );
};

export default UserFilterSearchBar;
