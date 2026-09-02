import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
            SELECT
                t.task_id,
                t.title,
                t.description,
                t.due_date,
                t.priority,
                s.name AS status,
                c.title AS course,
                c.code AS course_code
            FROM tasks t
            JOIN status s
                ON t.status_id = s.status_id
            JOIN courses c
                ON t.course_id = c.course_id
        `);

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch tasks",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { course_id, status_id, title, description, due_date, priority } =
      req.body;

    res.send(req.body);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch tasks",
    });
  }
});

export default router;
