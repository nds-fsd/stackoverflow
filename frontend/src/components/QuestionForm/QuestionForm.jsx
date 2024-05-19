import React from 'react';
import Styles from './QuestionForm.module.css';
import Header from "../Header/Header.jsx"
import Footer from "../Footer/Footer.jsx"

const QuestionForm = () => {
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
      <form className={Styles.form}>
        <h1>Ask a public question</h1>
        <div className={Styles.title}>
          <label htmlFor='title'>Title:</label>
          <input className={Styles.input} type='text' id='title' name='title' required />
        </div>
        <div className={Styles.question}>
          <label htmlFor='body'>Question:</label>
          <textarea className={Styles.input} id='body' name='body' rows='5' required />
        </div>
        <div className={Styles.tags}>
          <label htmlFor='tags'>Tags:</label>
          <input className={Styles.input} type='text' id='tags' name='tags' placeholder='Separate tags with commas' />
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
