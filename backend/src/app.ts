import express from "express";
import cors from "cors";
import prisma from "./prisma.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Quiz Builder API is running!");
});

app.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: true,
      },
    });

    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/quizzes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



app.post("/quizzes", async (req, res) => {
  try {
    const { title, questions } = req.body;

    const quiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions,
        },
      },
      include: {
        questions: true,
      },
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create quiz",
    });
  }
});

app.delete("/quizzes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.question.deleteMany({
      where: {
        quizId: id,
      },
    });

    await prisma.quiz.delete({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete quiz",
    });
  }
});

export default app;