import "./QuizList.css";
import { useEffect, useState } from "react";
import { deleteQuiz, getQuizzes } from "../services/api";
import type { Quiz } from "../types/quiz";
import { Link } from "react-router-dom";

function QuizList() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    useEffect(() => {
        loadQuizzes();
    }, []);

    async function handleDelete(id: number) {
        try {
            await deleteQuiz(id);
            await loadQuizzes();
        } catch {
            setError("Failed to delete quiz.");
        }
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="quiz-list">
            <h1>Quiz List</h1>

            <Link to="/create">
                <button className="btn btn-primary">
                    Create Quiz
                </button>
            </Link>


            {quizzes.length === 0 ? (
                <p>No quizzes found.</p>
            ) : (
                <ul className="quiz-items">
                    {quizzes.map((quiz) => (
                        <li key={quiz.id} className="quiz-item">
                            <Link to={`/quizzes/${quiz.id}`}>
                                {quiz.title}
                            </Link>

                            {" "}({quiz.questionsCount} questions)

                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(quiz.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default QuizList;