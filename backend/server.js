import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student Manager API is running");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const tasks = [
  {
    id: 1,
    title: "Database Normalization HW",
    courseId: 1,
    dueDate: "2026-09-02",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Web Development Project",
    courseId: 2,
    dueDate: "2026-09-05",
    priority: "Medium",
    completed: false,
  },
];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});
