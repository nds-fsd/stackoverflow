import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './InsideQuestionPage.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import profilePic from './profilePic.png';
import deleteIcon from './deleteIcon.png'; // Import the delete icon
import { getUserIdFromToken } from '../../_utils/localStorage.utils'; // Corrected path

const InsideQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [likeCounts, setLikeCounts] = useState({});
  const [likedComments, setLikedComments] = useState({});
  const [questionLikeCount, setQuestionLikeCount] = useState(0);
  const [likedQuestion, setLikedQuestion] = useState(false);
  const textareaRef = useRef(null);

  const userId = getUserIdFromToken(); // Get the actual user ID from the token
  console.log('USERID: ' + userId);

  // Logging userId for debugging
  useEffect(() => {
    console.log('User ID from getUserIdFromToken function:', userId);
  }, [userId]);

  const toggleQuestionLike = async () => {
    try {
      const method = likedQuestion ? 'unlike' : 'like';
      const response = await fetch(`http://localhost:3001/questions/${id}/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setQuestionLikeCount(data.likeCount); // Update the like count
        setLikedQuestion(!likedQuestion); // Toggle the liked state
      } else {
        console.error('Failed to toggle like');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const toggleLike = async (commentId) => {
    try {
      const method = likedComments[commentId] ? 'DELETE' : 'POST';
      const response = await fetch('http://localhost:3001/likes', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId, userId }),
      });

      if (response.ok) {
        fetchLikeCount(commentId); // Refresh like count after submission
        setLikedComments((prevLikedComments) => ({
          ...prevLikedComments,
          [commentId]: !prevLikedComments[commentId],
        }));
      } else {
        console.error('Failed to toggle like');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const fetchLikeCount = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3001/likes/${commentId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLikeCounts((prevCounts) => ({ ...prevCounts, [commentId]: data.likeCount }));
    } catch (error) {
      console.error('Error fetching like count:', error);
    }
  };

  const fetchUserLikes = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user-likes/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const likedCommentIds = data.map((like) => like.commentId);
      setLikedComments(
        likedCommentIds.reduce((acc, commentId) => {
          acc[commentId] = true;
          return acc;
        }, {}),
      );
    } catch (error) {
      console.error('Error fetching user likes:', error);
    }
  };

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`http://localhost:3001/questions/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuestion(data);
      setQuestionLikeCount(data.likes.length); // Set the like count
      setLikedQuestion(data.likes.includes(userId)); // Set the liked state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('http://localhost:3001/tags');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('Network response was not ok (fetchUsers)');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/comments/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok (fetchComments)');
      }
      const data = await response.json();
      setComments(data);

      // Fetch like counts for all comments
      data.forEach((comment) => fetchLikeCount(comment._id));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchTags();
    fetchUsers();
    fetchComments();
    fetchUserLikes(); // Fetch user likes
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId: id, userId, content }),
      });

      if (response.ok) {
        setContent('');
        fetchComments(); // Refresh comments after submission

        // Reset the height of the textarea to its initial state
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      } else {
        console.error('Failed to post comment');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3001/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        fetchComments(); // Refresh comments after deletion
      } else {
        console.error('Failed to delete comment');
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
          {question && (
            <>
              <div className={styles.questionBubble}>
                <div className={styles.questionAuthor}>
                  <img src={profilePic} alt='Profile' className={styles.profilePic} />
                  <span>
                    Asked by: {question.author ? question.author.username : 'Unknown'} on{' '}
                    {new Date(question.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h1>{question.title}</h1>
                <h3>{question.body}</h3>
                <h5>
                  Tags:{' '}
                  {question.tags
                    ? question.tags.map((tagId) => tagIdToNameMap[tagId] || tagId).join(', ')
                    : 'No tags available'}
                </h5>
                <div className={styles.heartBg}>
                  <div
                    className={`${styles.heartIcon} ${likedQuestion ? styles.liked : ''}`}
                    onClick={toggleQuestionLike}
                  ></div>
                  <div className={styles.likesAmount}>{questionLikeCount}</div>
                </div>
              </div>

              <div className={styles.questionBubble}>
                <form onSubmit={handleSubmit} className={styles.commentForm}>
                  <textarea
                    className={styles.commentInput}
                    name='commentInput'
                    placeholder='Add a comment'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onInput={handleInput}
                    ref={textareaRef}
                    required
                  />
                  <button type='submit' className={styles.submitButton}>
                    Submit Comment
                  </button>
                </form>
                <h3>Comments</h3>
                {comments.map((comment) => (
                  <div key={comment._id} className={styles.questionBubblecomment}>
                    <img src={profilePic} alt='Profile' className={styles.profilePic} />
                    {comment.userId._id === userId && ( // Check if the comment belongs to the logged-in user
                      <img
                        src={deleteIcon}
                        alt='Delete'
                        className={styles.deleteIcon}
                        onClick={() => handleDelete(comment._id)}
                      />
                    )}
                    <div className={styles.commentContent}>
                      <div className={styles.commentUsername}>
                        {comment.userId.username}
                        <span className={styles.commentTime}> • {new Date(comment.createdAt).toLocaleString()}</span>
                      </div>
                      <div className={styles.commentText}>
                        {comment.content}
                        <div className={styles.heartBg}>
                          <div
                            className={`${styles.heartIcon} ${likedComments[comment._id] ? styles.liked : ''}`}
                            onClick={() => toggleLike(comment._id)}
                          ></div>
                          <div className={styles.likesAmount}>{likeCounts[comment._id] || 0}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
