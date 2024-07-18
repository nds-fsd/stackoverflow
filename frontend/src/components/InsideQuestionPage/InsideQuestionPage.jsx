import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './InsideQuestionPage.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import profilePic from './profilePic.png';
import deleteIcon from './deleteIcon.png';
import { getUserIdFromToken } from '../../_utils/localStorage.utils';
import { api } from '../../_utils/api.js';

const InsideQuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [topQuestions, setTopQuestions] = useState([]);
  const [navigating, setNavigating] = useState(false); // New state for navigation loading
  const textareaRef = useRef(null);

  const userId = getUserIdFromToken();
  console.log('USERID: ' + userId);

  useEffect(() => {
    console.log('User ID from getUserIdFromToken function:', userId);
  }, [userId]);

  const toggleQuestionLike = async () => {
    try {
      const method = likedQuestion ? 'unlike' : 'like';
      const response = await api().post(`/questions/${id}/${method}`, { userId });

      setQuestionLikeCount(response.data.likeCount);
      setLikedQuestion(!likedQuestion);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const toggleLike = async (commentId) => {
    try {
      const method = likedComments[commentId] ? 'DELETE' : 'POST';
      const response = await api().request({
        url: '/likes',
        method,
        data: { commentId, userId },
      });

      fetchLikeCount(commentId);
      setLikedComments((prevLikedComments) => ({
        ...prevLikedComments,
        [commentId]: !prevLikedComments[commentId],
      }));
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const fetchLikeCount = async (commentId) => {
    try {
      const response = await api().get(`/likes/${commentId}`);
      setLikeCounts((prevCounts) => ({ ...prevCounts, [commentId]: response.data.likeCount }));
    } catch (error) {
      console.error('Error fetching like count:', error);
    }
  };

  const fetchUserLikes = async () => {
    try {
      const response = await api().get(`/user-likes/${userId}`);
      const likedCommentIds = response.data.map((like) => like.commentId);
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
      const response = await api().get(`/questions/${id}`);
      setQuestion(response.data);
      setQuestionLikeCount(response.data.likes.length);
      setLikedQuestion(response.data.likes.includes(userId));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await api().get('/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api().get('/users');
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api().get(`/comments/${id}`);
      setComments(response.data);
      response.data.forEach((comment) => fetchLikeCount(comment._id));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchTopQuestions = async () => {
    try {
      const response = await api().get('/questions?limit=5&sortBy=popular');
      setTopQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching top questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchTags();
    fetchUsers();
    fetchComments();
    fetchUserLikes();
    fetchTopQuestions();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api().post('/comments', { questionId: id, userId, content });
      setContent('');
      fetchComments();

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
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
      const response = await api().delete(`/comments/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const directToQuestion = (questionId) => {
    navigate('/questions/' + questionId);
  };

  const handleProfileClick = (username) => {
    setNavigating(true);
    navigate(`/users/${username}`);
  };

  if (loading || navigating) {
    return <div className={styles.loadingBackground}>Loading...</div>;
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
        <div className={styles.QuestionPageLeftbar}>
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
          {question && (
            <>
              <div className={styles.questionBubble}>
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
                    <img
                      src={profilePic}
                      alt='Profile'
                      className={styles.profilePic}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProfileClick(comment.userId.username);
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                    {comment.userId._id === userId && (
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
