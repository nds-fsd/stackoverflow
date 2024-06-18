import React, { useEffect, useState } from 'react';
import styles from './InsideQuestionPage.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { useParams } from 'react-router-dom';

const InsideQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3001/questions/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // Correctly set the parsed JSON data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(users); // This should now correctly log the users array

  return (
    <>
      <Header />
      <div className={styles['QuestionPageBody']}>
        <div className={styles['QuestionPageRightbar']}>
          <a href='/questions/new' className={styles['askNewQuestion']}>
            Ask Question
          </a>
          <div className={styles['QuestionPageRightbarBubbles']}>
            <h1>Top Questions</h1>
            <p>Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?</p>
            <p>Async/Await Function Not Handling Errors Properly</p>
            <p>What is the best modern tech stack we can use to create a Stackoverflow clone?</p>
            <p>How can I get (query string) parameters from the URL in Next.js?</p>
            <h1>Popular Tags</h1>
            <button className={styles['TagsRightBar']}>Mongo</button>
            <button className={styles['TagsRightBar']}>Express</button>
            <button className={styles['TagsRightBar']}>React</button>
            <button className={styles['TagsRightBar']}>NodeJS</button>
          </div>
        </div>

        <div className={styles['QuestionPageQuestions']}>
          {question && (
            <>
              <div className={styles['questionBubble']}>
                Asked by: {question.author} on {question.created_at}
                <h1>{question.title}</h1>
                <h3>{question.body}</h3>
                <h5>Tags: {question.tags}</h5>
              </div>

              <div className={styles['questionBubble']}>
                <input className={styles.commentInput} name='commentInput' placeholder='Add a comment' />
                <h3>Comments</h3>
                <div className={styles['questionBubblecomment']}>
                  <h4>{users[1].username} • 4 hours ago</h4>
                  <h5>I think you should do this</h5>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InsideQuestionPage;
