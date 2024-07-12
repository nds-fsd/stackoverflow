import React, { useEffect, useState } from 'react';
import styles from './QuestionPage.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import deleteIcon from './deleteIcon.png'; // Ensure the correct import path
import heartIcon from './heart.png'; // Ensure the correct import path
import { getUserIdFromToken } from '../../_utils/localStorage.utils'; // Corrected path to your local storage utilities

const QuestionPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedQuestions, setLikedQuestions] = useState({});
  const [questionLikeCounts, setQuestionLikeCounts] = useState({});
  const [sortOption, setSortOption] = useState('popular'); // State to manage sorting option
  const [page, setPage] = useState(1); // Page state for pagination
  const [totalQuestions, setTotalQuestions] = useState(0); // Total number of questions

  const userId = getUserIdFromToken(); // Get the actual user ID from the token
  console.log('USERID: ' + userId); // Logging user ID for debugging

  const fetchQuestionsAndTags = async (reset = false) => {
    try {
      if (reset) {
        setQuestions([]);
        setLoading(true);
      }
      const [questionsResponse, tagsResponse] = await Promise.all([
        axios.get(`http://localhost:3001/questions?page=${page}&limit=5&sortBy=${sortOption}`),
        axios.get('http://localhost:3001/tags'),
      ]);

      const questionsData = questionsResponse.data.questions;
      const totalQuestionsCount = questionsResponse.data.totalQuestions;

      const likedQuestionsMap = {};
      const questionLikeCountsMap = {};

      questionsData.forEach((question) => {
        likedQuestionsMap[question._id] = question.likes.includes(userId);
        questionLikeCountsMap[question._id] = question.likes.length;
      });

      setQuestions((prevQuestions) => {
        const combinedQuestions = reset ? questionsData : [...prevQuestions, ...questionsData];
        const uniqueQuestions = combinedQuestions.reduce((unique, item) => {
          return unique.some((question) => question._id === item._id) ? unique : [...unique, item];
        }, []);
        return uniqueQuestions;
      });
      setTags(tagsResponse.data);
      setLikedQuestions((prevLikedQuestions) => ({ ...prevLikedQuestions, ...likedQuestionsMap }));
      setQuestionLikeCounts((prevCounts) => ({ ...prevCounts, ...questionLikeCountsMap }));
      setTotalQuestions(totalQuestionsCount);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchQuestionsAndTags(true);
  }, [sortOption]);

  useEffect(() => {
    fetchQuestionsAndTags();
  }, [page]);

  const toggleQuestionLike = async (questionId) => {
    const method = likedQuestions[questionId] ? 'unlike' : 'like';

    try {
      const response = await fetch(`http://localhost:3001/questions/${questionId}/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setQuestionLikeCounts((prevCounts) => ({
          ...prevCounts,
          [questionId]: data.likeCount,
        }));
        setLikedQuestions((prevLikedQuestions) => ({
          ...prevLikedQuestions,
          [questionId]: !prevLikedQuestions[questionId],
        }));
      } else {
        console.error('Failed to toggle like');
      }
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
      const response = await axios.delete(`http://localhost:3001/questions/${questionId}`, {
        headers: {},
      });

      if (response.status === 204) {
        setQuestions(questions.filter((question) => question._id !== questionId));
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const tagIdToNameMap = tags.reduce((map, tag) => {
    map[tag._id] = tag.name;
    return map;
  }, {});

  return (
    <>
      <Header />
      <div className={styles.QuestionPageBody}>
        <div className={styles.QuestionPageRightbar}>
          <a href='/questions/new' className={styles.askNewQuestion}>
            Ask Question
          </a>
          <div className={styles.QuestionPageRightbarBubbles}>
            <h1>Top Questions</h1>
            <p>Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?</p>
            <p>Async/Await Function Not Handling Errors Properly</p>
            <p>What is the best modern tech stack we can use to create a Stackoverflow clone?</p>
            <p>How can I get (query string) parameters from the URL in Next.js?</p>
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
                question.author._id === userId && ( // Use the actual user ID from the session
                  <img
                    src={deleteIcon}
                    alt='Delete'
                    className={styles.deleteIcon}
                    onClick={(e) => handleDelete(question._id, e)}
                  />
                )}
              <h2>{question.title}</h2>
              <p>{question.body}</p>
              <ul>
                {question.tags && question.tags.map((tagId) => <li key={tagId}>{tagIdToNameMap[tagId] || tagId}</li>)}
              </ul>
              <p>Author: {question.author ? question.author.username : 'Unknown'}</p>
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
