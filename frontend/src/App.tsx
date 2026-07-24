import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import QuizList from "./pages/QuizList";
import CreateQuiz from "./pages/CreateQuiz";
import QuizDetails from "./pages/QuizDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quizzes" replace />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizzes/:id" element={<QuizDetails />} />
        <Route path="/create" element={<CreateQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;