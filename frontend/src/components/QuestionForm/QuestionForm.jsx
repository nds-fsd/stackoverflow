import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './QuestionForm.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { getUserIdFromToken } from '../../_utils/localStorage.utils';
import { api } from '../../_utils/api.js';

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  const userId = getUserIdFromToken();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      setShowLoginPrompt(true);
      return;
    }

    const questionData = {
      title,
      body,
      tags: tags.split(',').map((tag) => tag.trim()),
      authorId: userId,
    };

    try {
      const response = await api().post('/questions', questionData);
      console.log('Question created successfully:', response.data);
      setTitle('');
      setBody('');
      setTags('');
      navigate(`/questions/${response.data._id}`);
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <>
      <Header />
      <div className={Styles.container}>
        {showLoginPrompt && (
          <div className={Styles.loginPrompt}>
            <p>You must be logged in to post a question</p>
            <button onClick={() => setShowLoginPrompt(false)}>Close</button>
          </div>
        )}
        <span className={Styles.advice}>
          <h3>Here are a few tips to write the perfect question!</h3>
          <ul>
            <li>Write a short and concise title.</li>
            <li>Use the text area to describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Add "tags" to increase the views on your post.</li>
            <li>Review your question before posting it.</li>
          </ul>
          <h4>Now you are ready to go!!</h4>
        </span>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h1>Ask a public question</h1>
          <div className={Styles.title}>
            <label htmlFor='title'>Title:</label>
            <input
              className={Styles.input}
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={Styles.question}>
            <label htmlFor='body'>Question:</label>
            <textarea
              className={Styles.input}
              id='body'
              name='body'
              rows='5'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className={Styles.tags}>
            <label htmlFor='tags'>Tags:</label>
            <input
              className={Styles.input}
              type='text'
              id='tags'
              name='tags'
              placeholder='Separate tags with commas'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <button className={Styles.submit} type='submit'>
            Post
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default QuestionForm;
