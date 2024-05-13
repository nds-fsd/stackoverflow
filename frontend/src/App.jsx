import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuestionPage from './components/QuestionPage/QuestionPage'; // Make sure the import path is correct

function App() {
  return (
    <div>
      <Routes>
        <Route path='/Questions' element={<QuestionPage />} />
      </Routes>
    </div>
  );
}

export default App;
