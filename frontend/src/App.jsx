import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuestionForm from './componentsSTA-8/';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/questions/new' element={<QuestionForm />} />
      </Routes>
    </div>
  );
}

export default App;
