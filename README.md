# Quiz Builder

A full-stack web application for creating and managing quizzes.

## Preview

> *(Add screenshots here if available)*

<!--
![Quiz List](./screenshots/quiz-list.png)

![Quiz Details](./screenshots/quiz-details.png)

![Create Quiz](./screenshots/create-quiz.png)
-->

## Repository

https://github.com/Zhuyka1993/quiz-builder

## Features

- View all quizzes
- View quiz details
- Create new quizzes
- Delete quizzes
- Form validation
- REST API
- SQLite database with Prisma ORM

## Tech Stack

**Frontend**

- React
- TypeScript
- Vite
- React Router
- Fetch API
- CSS

**Backend**

- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite

## Project Structure

```text
quiz-builder/
├── backend/
└── frontend/
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Zhuyka1993/quiz-builder.git
cd quiz-builder
```

### Backend

Install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
```

Run the database migration:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:3000
```

### Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/quizzes` | Get all quizzes |
| GET | `/quizzes/:id` | Get quiz details |
| POST | `/quizzes` | Create a new quiz |
| DELETE | `/quizzes/:id` | Delete a quiz |

## Notes

- Frontend and backend are separate applications.
- The backend is built with Express, Prisma and SQLite.
- The frontend communicates with the backend through a REST API.
- The project uses TypeScript on both the frontend and backend.

## Author

Oleksii Lobok

GitHub: https://github.com/Zhuyka1993