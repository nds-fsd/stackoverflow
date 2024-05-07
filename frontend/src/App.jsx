import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuestionPage from './Components/QuestionPage'; // Make sure the import path is correct

function App() {
  return (
    <div>
      <Routes>
        <Route path='/questions' element={<QuestionPage />} />
      </Routes>
    </div>
  );
}

export default App;
