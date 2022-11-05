import React from 'react';
import Navigator from "./navigator";
import { QuizProvider } from './context/quiz.context';
const App = () => {
  return (
      <QuizProvider>
        <Navigator/>
      </QuizProvider>
  );
}

export default App;