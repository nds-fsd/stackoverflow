import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TagItem.module.css';

const TagItem = ({ tag }) => {
  return (
    <div className={styles.tag}>
      <div className={styles.titleContainer}>
        <Link to={`/tagged/${tag.name.toLowerCase()}`} className={styles.tagLink}>
          {tag.name}
        </Link>
      </div>
      <p>{tag.description}</p>
      <div className={styles.metricsContainer}>
        <span>{tag.questionCount?.toLocaleString()} questions</span>
        <span>{tag.askedThisYear?.toLocaleString()} asked this year</span>
      </div>
    </div>
  );
};

export default TagItem;
