import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import QuestionPage from './components/QuestionPage/QuestionPage';
import QuestionForm from './components/newQuestion.jsx';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Questions' element={<QuestionPage />} />
        <Route path='/questions/new' element={<QuestionForm />} />
      </Routes>
    </div>
  );
}

export default App;
