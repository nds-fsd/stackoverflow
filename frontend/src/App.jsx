import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import QuestionPage from './components/QuestionPage/QuestionPage';
import QuestionForm from './components/QuestionForm/QuestionForm';
import TagPage from './components/TagPage/TagPage';
import UserPage from './components/UserPage/UserPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/questions' element={<QuestionPage />} />
        <Route path='/questions/new' element={<QuestionForm />} />
        <Route path='/tags' element={<TagPage />} />
        <Route path='/users' element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
