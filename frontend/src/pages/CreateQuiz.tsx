import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../services/api";

type Question = {
  text: string;
  type: string;
};

function CreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      {
        text: "",
        type: "input",
      },
    ]);
  }

  function updateQuestion(
    index: number,
    field: keyof Question,
    value: string
  ) {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  }

  function removeQuestion(index: number) {
    setQuestions(questions.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Quiz title is required");
      return;
    }

    if (questions.length === 0) {
      setError("Add at least one question");
      return;
    }

    if (questions.some((q) => !q.text.trim())) {
      setError("Every question must have text");
      return;
    }

    try {
      setLoading(true);

      await createQuiz({
        title,
        questions,
      });

      navigate("/quizzes");
    } catch {
      setError("Failed to create quiz");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create Quiz</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Quiz title</label>
          <br />

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter quiz title"
          />
        </div>

        <br />

        <h2>Questions</h2>

        {questions.map((question, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
              <label>Question text</label>
              <br />

              <input
                type="text"
                value={question.text}
                onChange={(e) =>
                  updateQuestion(index, "text", e.target.value)
                }
                placeholder="Enter question"
              />
            </div>

            <br />

            <div>
              <label>Question type</label>
              <br />

              <select
                value={question.type}
                onChange={(e) =>
                  updateQuestion(index, "type", e.target.value)
                }
              >
                <option value="input">Input</option>
                <option value="boolean">Boolean</option>
              </select>
            </div>

            <br />

            <button
              type="button"
              onClick={() => removeQuestion(index)}
            >
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          Add Question
        </button>

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Quiz"}
        </button>

        {error && (
          <>
            <br />
            <br />
            <p>{error}</p>
          </>
        )}
      </form>
    </div>
  );
}

export default CreateQuiz;