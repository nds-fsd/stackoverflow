import React, { useEffect, useState } from 'react';
import styles from './QuestionPage.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import deleteIcon from './deleteIcon.png'; // Ensure the correct import path
import heartIcon from './heart.png'; // Ensure the correct import path

const QuestionPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedQuestions, setLikedQuestions] = useState({});
  const [questionLikeCounts, setQuestionLikeCounts] = useState({});
  const [sortOption, setSortOption] = useState('popular'); // State to manage sorting option

  const hardcodedUserId = '6688408003482d4cf7660b82'; // Mocked user ID

  const fetchQuestionsAndTags = async () => {
    setLoading(true);
    try {
      const [questionsResponse, tagsResponse] = await Promise.all([
        axios.get('http://localhost:3001/questions'),
        axios.get('http://localhost:3001/tags'),
      ]);

      const questionsData = questionsResponse.data;

      const likedQuestionsMap = {};
      const questionLikeCountsMap = {};

      questionsData.forEach((question) => {
        likedQuestionsMap[question._id] = question.likes.includes(hardcodedUserId);
        questionLikeCountsMap[question._id] = question.likes.length;
      });

      setQuestions(questionsData);
      setTags(tagsResponse.data);
      setLikedQuestions(likedQuestionsMap);
      setQuestionLikeCounts(questionLikeCountsMap);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionsAndTags();
  }, []);

  useEffect(() => {
    const sortedQuestions = [...questions].sort((a, b) => {
      if (sortOption === 'popular') {
        return questionLikeCounts[b._id] - questionLikeCounts[a._id];
      } else if (sortOption === 'new') {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });
    setQuestions(sortedQuestions);
  }, [sortOption, questionLikeCounts]);

  const toggleQuestionLike = async (questionId) => {
    const method = likedQuestions[questionId] ? 'unlike' : 'like';

    try {
      const response = await fetch(`http://localhost:3001/questions/${questionId}/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: hardcodedUserId }),
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
    fetchQuestionsAndTags();
  };

  if (loading) {
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
              style={{ marginBottom: '20px' }}
              onClick={() => {
                directToQuestion(question._id);
              }}
            >
              {question.author && question.author._id === hardcodedUserId && (
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuestionPage;
