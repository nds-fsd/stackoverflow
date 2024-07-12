import React, { useState } from 'react';
import styles from './TagFilterSearchBar.module.css';

const TagFilterSearchBar = ({ placeholder, data, onFilter }) => {
  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    onFilter(searchWord);
  };

  const clearInput = () => {
    setWordEntered('');
    onFilter('');
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        {!wordEntered && <img src='/assets/icons/search.svg' alt='Search Icon' className={styles.searchIcon} />}
        <input
          type='text'
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          className={styles.inputField}
        />
        {wordEntered && <div className={styles.closeIcon} onClick={clearInput}></div>}
      </div>
    </div>
  );
};

export default TagFilterSearchBar;
