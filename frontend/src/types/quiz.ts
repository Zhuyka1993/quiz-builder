export interface Quiz {
  id: number;
  title: string;
  questionsCount: number;
}

export interface Question {
  id: number;
  text: string;
  type: string;
}

export interface QuizDetails {
  id: number;
  title: string;
  questions: Question[];
}