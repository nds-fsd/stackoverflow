import React, { useEffect, useState } from 'react';
import styles from './QuestionPage.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import deleteIcon from './deleteIcon.png';
import heartIcon from './heart.png';
import profilePic from './profilePic.png';
import { getUserIdFromToken } from '../../_utils/localStorage.utils';
import { api } from '../../_utils/api';

const QuestionPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [topQuestions, setTopQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedQuestions, setLikedQuestions] = useState({});
  const [questionLikeCounts, setQuestionLikeCounts] = useState({});
  const [sortOption, setSortOption] = useState('popular');
  const [page, setPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const fetchQuestionsAndTags = async (reset = false) => {
    const userId = getUserIdFromToken();

    try {
      if (reset) {
        setQuestions([]);
        setLoading(true);
      }
      const [questionsResponse, tagsResponse] = await Promise.all([
        api().get(`/questions?page=${page}&limit=5&sortBy=${sortOption}`),
        api().get('/tags'),
      ]);

      const questionsData = questionsResponse.data.questions;
      const totalQuestionsCount = questionsResponse.data.totalQuestions;

      const likedQuestionsMap = {};
      const questionLikeCountsMap = {};

      questionsData.forEach((question) => {
        likedQuestionsMap[question._id] = userId ? question.likes.includes(userId) : false;
        questionLikeCountsMap[question._id] = question.likes.length;
      });

      const sortedQuestions = [...questionsData].sort((a, b) => {
        if (sortOption === 'popular') {
          return (b.likes?.length || 0) - (a.likes?.length || 0);
        } else if (sortOption === 'new') {
          return new Date(b.created_at) - new Date(a.created_at);
        }
        return 0;
      });

      setQuestions((prevQuestions) => {
        const combinedQuestions = reset ? sortedQuestions : [...prevQuestions, ...sortedQuestions];
        const uniqueQuestions = combinedQuestions.reduce((unique, item) => {
          return unique.some((question) => question._id === item._id) ? unique : [...unique, item];
        }, []);
        return uniqueQuestions;
      });

      setTags(tagsResponse.data);
      setLikedQuestions((prevLikedQuestions) => ({ ...prevLikedQuestions, ...likedQuestionsMap }));
      setQuestionLikeCounts((prevCounts) => ({ ...prevCounts, ...questionLikeCountsMap }));
      setTotalQuestions(totalQuestionsCount);

      fetchTopQuestions(); // Fetch top questions after main questions are set
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopQuestions = async () => {
    try {
      const response = await api().get('/questions?limit=5&sortBy=popular');
      const topQuestionsData = response.data.questions;

      // Sort questions by like count in descending order if not already sorted by the API
      const sortedTopQuestions = topQuestionsData.sort((a, b) => b.likes.length - a.likes.length);

      setTopQuestions(sortedTopQuestions);
    } catch (error) {
      console.error('Error fetching top questions:', error);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchQuestionsAndTags(true);
  }, [sortOption]);

  useEffect(() => {
    fetchQuestionsAndTags();
  }, [page]);

  useEffect(() => {
    const handleAuthChange = () => {
      fetchQuestionsAndTags(true);
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const toggleQuestionLike = async (questionId) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setShowLoginPrompt(true);
      return;
    }

    const method = likedQuestions[questionId] ? 'unlike' : 'like';

    try {
      const response = await api().post(`/questions/${questionId}/${method}`, { userId });

      setQuestionLikeCounts((prevCounts) => ({
        ...prevCounts,
        [questionId]: response.data.likeCount,
      }));
      setLikedQuestions((prevLikedQuestions) => ({
        ...prevLikedQuestions,
        [questionId]: !prevLikedQuestions[questionId],
      }));
      fetchTopQuestions(); // Refresh top questions
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const directToQuestion = (questionId) => {
    navigate('/questions/' + questionId);
  };

  const handleDelete = async (questionId, e) => {
    e.stopPropagation(); // Prevent navigating to the question page
    try {
      const response = await api().delete(`/questions/${questionId}`);

      if (response.status === 204) {
        setQuestions(questions.filter((question) => question._id !== questionId));
        fetchTopQuestions(); // Refresh top questions
      } else {
        console.error('Failed to delete question');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setPage(1);
  };

  const loadMoreQuestions = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && page === 1) {
    return <div className={styles.loadingBackground}>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const tagIdToNameMap = tags.reduce((map, tag) => {
    map[tag._id] = tag.name;
    return map;
  }, {});

  const handleProfileClick = (username) => {
    navigate(`/users/${username}`);
  };

  return (
    <>
      <Header />
      <div className={styles.QuestionPageBody}>
        {showLoginPrompt && (
          <div className={styles.loginPrompt}>
            <p>You must be logged in to like and comment</p>
            <button onClick={() => setShowLoginPrompt(false)}>Close</button>
          </div>
        )}
        <div className={styles.QuestionPageRightbar}>
          <a href='/questions/new' className={styles.askNewQuestion}>
            Ask Question
          </a>
          <div className={styles.QuestionPageRightbarBubbles}>
            <h1>Top Questions</h1>
            {topQuestions.map((question) => (
              <p key={question._id} onClick={() => directToQuestion(question._id)} style={{ cursor: 'pointer' }}>
                {question.title}
              </p>
            ))}
            <h1>Popular Tags</h1>
            <button className={styles.TagsRightBar}>Mongo</button>
            <button className={styles.TagsRightBar}>Express</button>
            <button className={styles.TagsRightBar}>React</button>
            <button className={styles.TagsRightBar}>NodeJS</button>
          </div>
        </div>

        <div className={styles.QuestionPageQuestions}>
          <div className={styles.sortDropdown}>
            <label htmlFor='sort'>Sort by:</label>
            <select id='sort' value={sortOption} onChange={handleSortChange}>
              <option value='popular'>Popular</option>
              <option value='new'>New</option>
            </select>
          </div>
          {questions.map((question) => (
            <div
              className={styles.questionBubble}
              key={question._id}
              style={{ marginBottom: '20px', position: 'relative' }}
              onClick={() => {
                directToQuestion(question._id);
              }}
            >
              {question.author &&
                question.author._id === getUserIdFromToken() && ( // Use the actual user ID from the session
                  <img
                    src={deleteIcon}
                    alt='Delete'
                    className={styles.deleteIcon}
                    onClick={(e) => handleDelete(question._id, e)}
                  />
                )}
              <div className={styles.questionAuthor}>
                <img
                  src={profilePic}
                  alt='Profile'
                  className={styles.profilePic}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProfileClick(question.author.username);
                  }}
                  style={{ cursor: 'pointer' }}
                />
                <span>Author: {question.author ? question.author.username : 'Unknown'}</span>
              </div>
              <br></br>
              <h1>{question.title}</h1>
              <p>{question.body}</p>
              <ul>
                {question.tags && question.tags.map((tagId) => <li key={tagId}>{tagIdToNameMap[tagId] || tagId}</li>)}
              </ul>
              <p>Published: {question.created_at && new Date(question.created_at).toLocaleDateString()}</p>
              <div className={styles.heartBg}>
                <div
                  className={`${styles.heartIcon} ${likedQuestions[question._id] ? styles.liked : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleQuestionLike(question._id);
                  }}
                  style={{ backgroundImage: `url(${heartIcon})` }}
                ></div>
                <div className={styles.likesAmount}>{questionLikeCounts[question._id]}</div>
              </div>
            </div>
          ))}
          {questions.length < totalQuestions && (
            <button className={styles.loadMoreButton} onClick={loadMoreQuestions}>
              Load More
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuestionPage;
