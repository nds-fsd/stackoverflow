import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserItem.module.css';

const UserItem = ({ user }) => {
  return (
    <div className={styles.user}>
      <div className={styles.imageContainer}>
        <img src={user.profile_picture} alt={`${user.username}'s photo`} className={styles.profilePicture} />
      </div>
      <div className={styles.userInfo}>
        <Link to={`/users/${user.username}`} className={styles.userLink}>
          {user.username}
        </Link>
        <div className={styles.reputation}>
          <img src='/assets/icons/reputation.svg' alt='Reputation Icon' className={styles.reputationIcon} />
          <p>{user.reputation}</p>
        </div>
      </div>
      {user.topTags && user.topTags.length > 0 && (
        <div className={styles.tagsContainer}>
          {user.topTags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserItem;
