import React, { useEffect, useState } from 'react';
import styles from './InsideQuestionPage.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { useParams } from 'react-router-dom';
import profilePic from './profilePic.png';
import photographer from './photographer.png';

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
                <div className={styles.questionBubblecomment}>
                  <img src={profilePic} alt='Italian Trulli' className={styles.profilePic} />
                  <div className={styles.commentContent}>
                    <div className={styles.commentUsername}>
                      {users[1] && users[1].username}
                      <span className={styles.commentTime}> • 4 hours ago</span>
                    </div>
                    <div className={styles.commentText}>
                      It sounds like you're encountering a challenging issue with the WebSocket connection when accessed
                      via an external server address. Here are some detailed steps and considerations that might help
                      you troubleshoot and resolve this problem: Server Configuration: First, ensure that your Comfy UI
                      server is configured to accept connections from all IP addresses, not just localhost. Sometimes
                      servers are set up to listen only to local connections by default, which can cause issues when
                      trying to access them externally. Firewall and Network Security: Check the firewall settings on
                      your server. Firewalls can block incoming connections on the port used by your WebSocket server.
                      Additionally, if you are using cloud services like AWS, Azure, or Google Cloud Platform, make sure
                      that the security groups or network ACLs are configured to allow traffic on the required port.
                      Good luck, and I hope this helps resolve your problem! If you need further assistance, feel free
                      to ask.
                    </div>
                  </div>
                </div>

                <div className={styles.questionBubblecomment}>
                  <img src={photographer} alt='Italian Trulli' className={styles.profilePic} />
                  <div className={styles.commentContent}>
                    <div className={styles.commentUsername}>
                      {users[2] && users[2].username}
                      <span className={styles.commentTime}> • 23 minutes ago</span>
                    </div>
                    <div className={styles.commentText}>
                      Why doesnt anyone try googling first, that's what its for, also, there chatGPT now, try going
                      there first, this has been asnwered several times now, i see this every 2 days...
                    </div>
                  </div>
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
