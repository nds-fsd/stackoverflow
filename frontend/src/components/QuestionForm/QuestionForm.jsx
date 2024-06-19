import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Styles from './QuestionForm.module.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import axios from 'axios';

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    const questionData = {
      title,
      body,
      tags: tags.split(',').map((tag) => tag.trim()),
      authorId: '60d0fe4f5311236168a109ca', // Hardcoded author ID for testing
    };

    try {
      const response = await axios.post('http://localhost:3001/questions', questionData);
      console.log('Question created successfully:', response.data);
      // Clear form
      setTitle('');
      setBody('');
      setTags('');
      // Navigate to the new question's page
      navigate(`/question/${response.data._id}`);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with a status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  return (
    <>
      <Header />
      <div className={Styles.container}>
        <span className={Styles.advice}>
          <h3>Here are a few tips to write the perfect question!</h3>
          <ul>
            <li>Write a short and concise title.</li>
            <li>Use the text area to describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Add "tags" to increment the views on your post.</li>
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
