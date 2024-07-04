import React, { useEffect, useState } from 'react';
import styles from './QuestionPage.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import deleteIcon from './deleteIcon.png'; // Ensure the correct import path
import { getUserToken, getUserSession } from '../../_utils/localStorage.utils'; // Ensure the correct path

const QuestionPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userSession = { _id: '663d370a40d2aa2e407ce4c0' }; // Mocking userSession for testing
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/questions');
        setQuestions(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const directToQuestion = (questionId) => {
    navigate('/questions/' + questionId);
  };

  const handleDelete = async (questionId) => {
    const token = getUserToken();

    try {
      const response = await axios.delete(`http://localhost:3001/questions/${questionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          {questions &&
            questions.map((question) => (
              <div
                className={styles.questionBubble}
                key={question._id}
                style={{ marginBottom: '20px' }}
                onClick={() => {
                  directToQuestion(question._id);
                }}
              >
                {question.author && question.author._id === userSession._id && (
                  <img
                    src={deleteIcon}
                    alt='Delete'
                    className={styles.deleteIcon}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigating to the question page
                      handleDelete(question._id);
                    }}
                  />
                )}
                <h2>{question.title}</h2>
                <p>{question.body}</p>
                <ul>{question.tags && question.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <p>Author: {question.author ? question.author.username : 'Unknown'}</p> {/* Display the username */}
                <p>Published: {new Date(question.created_at).toLocaleDateString()}</p>
                <p>Last Modified: {new Date(question.updated_at).toLocaleDateString()}</p>
                <p>Votes: {question.votes}</p>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuestionPage;
