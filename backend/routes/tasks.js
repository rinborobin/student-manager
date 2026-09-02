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

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch tasks",
    });
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
      res.status(204).json(null);
    }
    res.status(200).json(rows);
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

    const [result] = await pool.query(
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

    res.status(200).json({ message: "Task updated", taskId: result.taskId });
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

    const [result] = await pool.query(
      `INSERT INTO tasks
             (course_id, status_id, title, description, due_date, priority)
             VALUES (?, ?, ?, ?, ?, ?)`,
      [courseId, statusId, title, description, dueDate, priority],
    );

    res.status(201).json({
      message: "Task created",
      taskId: result.insertId,
    });
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
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch tasks",
    });
  }
});

export default router;
