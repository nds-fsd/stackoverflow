import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import QuestionForm from './components/newQuestion.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/questions/new' element={<QuestionForm />} />
      </Routes>
    </div>
  );
}

export default App;
