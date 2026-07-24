import { useEffect, useState } from "react";
import { getQuizzes } from "../services/api";
import type { Quiz } from "../types/quiz";
import { Link } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadQuizzes() {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch {
        setError("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    }

    loadQuizzes();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

return (
  <div style={{ padding: "20px" }}>
    <h1>Quiz List</h1>

    <Link to="/create">
      <button>Create Quiz</button>
    </Link>

    <hr />

    {quizzes.length === 0 ? (
      <p>No quizzes found.</p>
    ) : (
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/quizzes/${quiz.id}`}>
              {quiz.title}
            </Link>

            {" "}({quiz.questionsCount} questions)
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default QuizList;