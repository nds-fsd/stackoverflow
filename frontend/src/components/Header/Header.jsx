import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header className={styles.header}>
      <div className={styles.menuToggle} onClick={handleMenuToggle}>
        <div className={styles.hamburger}></div>
        <div className={styles.hamburger}></div>
        <div className={styles.hamburger}></div>
      </div>

      <img src='/assets/img/logo.png' alt='Logo' className={styles.logo} />
      <input type='text' placeholder='Search...' className={styles.searchBar} />

      <button className={`${styles.btn} ${styles.loginBtn}`}>Log in</button>
      <button className={`${styles.btn} ${styles.signInBtn}`}>Sign in</button>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <a href='/'>
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            fill='currentColor'
            class='bi bi-house-door'
            viewBox='0 0 16 16'
          >
            <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z' />
          </svg>{' '}
          Home
        </a>
        <a href='/Users'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            fill='currentColor'
            class='bi bi-house-door'
            viewBox='0 0 16 16'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z' />
          </svg>{' '}
          Users
        </a>
        <a href='/Questions'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            fill='currentColor'
            class='bi bi-house-door'
            viewBox='0 0 16 16'
          >
            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
            <path d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94' />
          </svg>{' '}
          Questions
        </a>
        <a href='/Tags'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            fill='currentColor'
            class='bi bi-house-door'
            viewBox='0 0 16 16'
          >
            <path d='M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z' />
            <path d='M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z' />
          </svg>{' '}
          Tags
        </a>
      </div>
    </header>
  );
};

export default Header;
