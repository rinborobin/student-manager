import express from "express";
// import pool from "./db.js";

const app = express();
const PORT = 3000;

import taskRoute from "./routes/tasks.js";
import courseRoute from "./routes/course.js";
import errorHandler from "./middleware/errorHandler.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student Manager API is running");
});

app.use("/api/courses", courseRoute);
app.use("/api/tasks", taskRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
