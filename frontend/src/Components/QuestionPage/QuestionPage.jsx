import React from 'react';
import StackOverflowLogo from './ImagenesQP/StackOverflow.png';
import styles from './QuestionPage.module.css';


const questions = [
  {
    id: 1,
    title: 'How do I center a div in CSS?',
    description:
      "I'm trying to center a div within a parent container in CSS. I've tried several approaches, but none seem to work. Can anyone suggest a method?",
    tags: ['html', 'css', 'web-development'],
    votes: 25,
    author: 'John Doe',
    publishedDate: '2023-01-05',
    modifiedDate: '2023-01-10',
  },
  {
    id: 2,
    title: 'How can I merge two lists in Python?',
    description:
      "What's the best way to merge two lists in Python? I know I can use the + operator, but are there other more efficient methods?",
    tags: ['python', 'list', 'merge'],
    votes: 40,
    author: 'Alice Johnson',
    publishedDate: '2023-02-15',
    modifiedDate: '2023-02-20',
  },
  {
    id: 3,
    title: 'Why is my React component re-rendering?',
    description:
      "I have a React component that keeps re-rendering every time I update the state, even if it's not related to the parts of the state that changed. Why does this happen?",
    tags: ['react', 'javascript', 'web-development'],
    votes: 15,
    author: 'Emily Smith',
    publishedDate: '2023-03-10',
    modifiedDate: '2023-03-15',
  },
  {
    id: 4,
    title: "What is the difference between 'let' and 'var' in JavaScript?",
    description:
      "Can someone explain the difference between 'let' and 'var' in JavaScript? I'm a bit confused about when to use each.",
    tags: ['javascript', 'variables', 'es6'],
    votes: 30,
    author: 'Mike Brown',
    publishedDate: '2023-04-01',
    modifiedDate: '2023-04-06',
  },
];

const QuestionPage = () => {
  return (
    <>
      <div className={styles['QuestionPageBody']}>
        <div className={styles['QuestionPageNavbar']}>
          <input type='text' className={styles['OrangeSearchBar']} placeholder='Search...' />
        </div>

        <div className={styles['QuestionPageLeftbar']}>
          <img className={styles['QuestionPageSOLogo']} src={StackOverflowLogo} alt='Stack Overflow Logo' />
          <a href='/' className={styles['LeftBarButton']}>
            Home
          </a>

          <a href='/questions' className={styles['LeftBarButton']}>
            Questions
          </a>

          <a href='/tags' className={styles['LeftBarButton']}>
            Tags
          </a>

          <a href='/users' className={styles['LeftBarButton']}>
            Users
          </a>
        </div>

        <div className={styles['QuestionPageRightbar']}>
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
          <a href='/questions/new' className={styles['askNewQuestion']}>
            Ask Question
          </a>{' '}
          {questions.map((question) => (
            <div className={styles['questionBubble']} key={question.id} style={{ marginBottom: '20px' }}>
              <h2>{question.title}</h2>
              <p>{question.description}</p>
              <ul>
                {question.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p>Author: {question.author}</p>
              <p>Published: {question.publishedDate}</p>
              <p>Last Modified: {question.modifiedDate}</p>
              <p>Votes: {question.votes}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
