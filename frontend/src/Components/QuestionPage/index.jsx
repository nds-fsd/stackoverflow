import React from 'react';
import '../../index.css';
// Assuming ImagenesQP is a component you want to import.
// Adjust the import according to what's actually being exported from './ImagenesQP'.
import StackOverflowLogo from './ImagenesQP/StackOverflow.png'; // Adjust the path as necessary

const questions = [
  {
    id: 1,
    title: 'How do I center a div in CSS?',
    description:
      "I'm trying to center a div within a parent container in CSS. I've tried several approaches, but none seem to work. Can anyone suggest a method?",
    tags: ['html', 'css', 'web-development'],
  },
  {
    id: 2,
    title: 'How can I merge two lists in Python?',
    description:
      "What's the best way to merge two lists in Python? I know I can use the + operator, but are there other more efficient methods?",
    tags: ['python', 'list', 'merge'],
  },
  {
    id: 3,
    title: 'Why is my React component re-rendering?',
    description:
      "I have a React component that keeps re-rendering every time I update the state, even if it's not related to the parts of the state that changed. Why does this happen?",
    tags: ['react', 'javascript', 'web-development'],
  },
  {
    id: 4,
    title: "What is the difference between 'let' and 'var' in JavaScript?",
    description:
      "Can someone explain the difference between 'let' and 'var' in JavaScript? I'm a bit confused about when to use each.",
    tags: ['javascript', 'variables', 'es6'],
  },
];

const QuestionPage = () => {
  return (
    <>
      <div className='QuestionPageBody'>
        <div className='QuestionPageNavbar'>
          <input type='text' class='orangeSearchBar' placeholder='Search...' />
        </div>

        <div className='QuestionPageLeftbar'>
          <img className='QuestionPageSOLogo' src={StackOverflowLogo} alt='Stack Overflow Logo' />
          <button className='LeftBarButton'>Home</button>
          <button className='LeftBarButton'>Questions</button>
          <button className='LeftBarButton'>Tags</button>
          <button className='LeftBarButton'>Users</button>
        </div>

        <div className='QuestionPageRightbar'>
          <h1>Top Questions</h1>
          <p>Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?</p>
          <p>Async/Await Function Not Handling Errors Properly</p>
          <p>What is the best modern tech stack we can use to create a Stackoverflow clone?</p>
          <p>How can I get (query string) parameters from the URL in Next.js?</p>
          <h1>Popular Tags</h1>
        </div>

        <div className='QuestionPageQuestions'>
          {questions.map((question) => (
            <div key={question.id} style={{ marginBottom: '20px' }}>
              <h2>{question.title}</h2>
              <p>{question.description}</p>
              <ul>
                {question.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
