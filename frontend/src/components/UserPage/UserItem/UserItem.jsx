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
        <p>{user.reputation}</p>
      </div>
      <div className={styles.tagsPlaceholder}>
        <p>Tags Placeholder</p>
      </div>
    </div>
  );
};

export default UserItem;
