import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TagItem.module.css';

const TagItem = ({ tag }) => {
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.tag}>
      <div className={styles.titleContainer}>
        <Link to={`/tagged/${tag.name.toLowerCase()}`} className={styles.tagLink}>
          {tag.name}
        </Link>
      </div>
      <p>{tag.description}</p>
      <div className={styles.metricsContainer}>
        <span>Last used: {tag.latestQuestionDate ? formatDate(tag.latestQuestionDate) : 'N/A'}</span>
        <span>Popularity: {tag.popularity}</span>
      </div>
    </div>
  );
};

export default TagItem;
