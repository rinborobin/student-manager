import express from "express";
import pool from "../db.js";
import { success } from "../utils/response.js";

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

    if (rows.length === 0) {
      error(res, "Task not found.", 204);
    }

    success(res, rows, 200);
  } catch (error) {
    errorHandler(error, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      `SELECT
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
            WHERE task_id = ?`,
      [id],
    );
    if (rows.length === 0) {
      error(res, "Task not found.", 204);
    }

    success(res, rows, 200);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch tasks",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { courseId, statusId, title, description, dueDate, priority } =
      req.body;

    const [row] = await pool.query(
      `
            UPDATE 
                    tasks
            SET
                    course_id = ?,
                    status_id = ?,
                    title = ?,
                    description = ?,
                    due_date = ?,
                    priority = ?
            WHERE task_id = ?;`,
      [courseId, statusId, title, description, dueDate, priority, id],
    );

    if (row.length === 0) {
      error(res, "Task not found.", 204);
    }

    success(res, row, 200);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch tasks",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { courseId, statusId, title, description, dueDate, priority } =
      req.body;

    const [row] = await pool.query(
      `INSERT INTO tasks
             (course_id, status_id, title, description, due_date, priority)
             VALUES (?, ?, ?, ?, ?, ?)`,
      [courseId, statusId, title, description, dueDate, priority],
    );

    if (row.length === 0) {
      error(res, "Task not found.", 204);
    }

    success(res, { courseId: result.insertId }, 201);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch tasks",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await pool.query(`DELETE FROM tasks WHERE task_id = ?`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      error(res, "Task not found.", 204);
    }

    success(res, "Task deleted", 200);
  } catch (error) {
    next(error);
  }
});

export default router;
