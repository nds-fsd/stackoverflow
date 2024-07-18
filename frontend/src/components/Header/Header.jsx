import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import AuthModal from '../AuthModal/AuthModal';
import axios from 'axios';
import ReactSearchBox from 'react-search-box';
import { getUserSession, removeSession } from '../../_utils/localStorage.utils';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const userSession = getUserSession();
    if (userSession) {
      setIsAuthenticated(true);
      setUser(userSession);
    }
    fetchSearchData(); // Fetch search data on component mount
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleModalShow = (login) => {
    setIsLogin(login);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleAuthSuccess = () => {
    const userSession = getUserSession();
    if (userSession) {
      setIsAuthenticated(true);
      setUser(userSession);
    }
    window.dispatchEvent(new Event('authChange'));
  };

  const handleLogout = () => {
    removeSession();
    setIsAuthenticated(false);
    setUser(null);
    window.dispatchEvent(new Event('authChange')); // Trigger authChange event on logout
  };

  const fetchSearchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/questions');
      console.log('Fetched questions response:', response.data); // Debugging log

      if (response.data.questions && Array.isArray(response.data.questions)) {
        const searchData = response.data.questions.map((question) => ({
          key: question._id,
          value: question.title,
        }));

        // Log search data to debug
        console.log('Search data:', searchData);

        setSearchData(searchData);
      } else {
        console.error('Expected an array but got:', response.data);
      }
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };

  const handleSearchSelect = (record) => {
    // Log the selected record to debug
    console.log('Selected record:', record);
    if (record && record.item && record.item.key) {
      console.log(`Navigating to /questions/${record.item.key}`);
      navigate(`/questions/${record.item.key}`);
    } else {
      console.error('Record key is undefined:', record);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.menuToggle} onClick={handleMenuToggle}>
        <div className={styles.hamburger}></div>
        <div className={styles.hamburger}></div>
        <div className={styles.hamburger}></div>
      </div>

      <Link to='/'>
        <img src='/assets/img/logo.png' alt='Logo' className={styles.logo} />
      </Link>

      <nav className={styles.navMenu}>
        <Link to='/'>Home</Link>
        <Link to='/questions'>Questions</Link>
        <Link to='/users'>Users</Link>
        <Link to='/tags'>Tags</Link>
      </nav>

      <div className={styles.searchBar}>
        <ReactSearchBox
          placeholder='Search for questions...'
          data={searchData}
          onSelect={handleSearchSelect}
          inputFontColor='#ffffff'
          inputBackgroundColor='#000000'
          inputHeight='40px'
          inputBorderColor='#fff'
          dropDownHoverColor='#f0f0f0'
          className={styles.searchBarDropdown}
        />
      </div>

      {isAuthenticated ? (
        <>
          <span className={styles.welcome}>Welcome, {user.username}!</span>
          <button className={`${styles.btn} ${styles.logoutBtn}`} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button className={`${styles.btn} ${styles.loginBtn}`} onClick={() => handleModalShow(true)}>
            Login
          </button>
          <button className={`${styles.btn} ${styles.signInBtn}`} onClick={() => handleModalShow(false)}>
            Sign up
          </button>
        </>
      )}

      <AuthModal show={modalShow} handleClose={handleModalClose} isLogin={isLogin} onAuthSuccess={handleAuthSuccess} />

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <Link to='/'>
          {' '}
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' viewBox='0 0 16 16'>
            <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5-.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z' />
          </svg>
          Home
        </Link>
        <Link to='/users'>
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' viewBox='0 0 16 16'>
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z' />
          </svg>
          Users
        </Link>
        <Link to='/questions'>
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' viewBox='0 0 16 16'>
            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
            <path d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94' />
          </svg>
          Questions
        </Link>
        <Link to='/tags'>
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' viewBox='0 0 16 16'>
            <path d='M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z' />
            <path d='M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z' />
          </svg>
          Tags
        </Link>
      </div>
    </header>
  );
};

export default Header;
