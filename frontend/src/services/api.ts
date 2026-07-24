const API_URL = "http://localhost:3000";

export async function getQuizzes() {
  const response = await fetch(`${API_URL}/quizzes`);

  if (!response.ok) {
    throw new Error("Failed to fetch quizzes");
  }

  return response.json();
}

export async function getQuiz(id: string) {
  const response = await fetch(`${API_URL}/quizzes/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch quiz");
  }

  return response.json();
}

export async function createQuiz(quiz: {
  title: string;
  questions: {
    text: string;
    type: string;
  }[];
}) {
  const response = await fetch(`${API_URL}/quizzes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  });

  if (!response.ok) {
    throw new Error("Failed to create quiz");
  }

  return response.json();
}

export async function deleteQuiz(id: number) {
  const response = await fetch(`${API_URL}/quizzes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete quiz");
  }
}