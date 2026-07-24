import "./QuizDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuiz } from "../services/api";
import type { QuizDetails as QuizDetailsType } from "../types/quiz";

function QuizDetails() {
    const { id } = useParams();

    const [quiz, setQuiz] = useState<QuizDetailsType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadQuiz() {
            try {
                if (!id) return;

                const data = await getQuiz(id);
                setQuiz(data);
            } catch (err) {
                setError("Failed to load quiz");
            } finally {
                setLoading(false);
            }
        }

        loadQuiz();
    }, [id]);
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!quiz) {
        return <p>Quiz not found.</p>;
    }

    return (
        <div className="quiz-details">
            <h1>{quiz.title}</h1>

            <h2>Questions</h2>

            {quiz.questions.length === 0 ? (
                <p>No questions yet.</p>
            ) : (
                <div>
                    {quiz.questions.map((question) => (
                        <div
                            key={question.id}
                            className="question-card"
                        >
                            <p className="question-title">
                                {question.text}
                            </p>

                            {question.type === "input" ? (
                                <input
                                    className="question-input"
                                    type="text"
                                    placeholder="Answer"
                                    disabled
                                />
                            ) : (
                                <div className="boolean-options">
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            disabled
                                        />
                                        {" "}True
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            disabled
                                        />
                                        {" "}False
                                    </label>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}

export default QuizDetails;