import express from "express";
import pool from "../db.js";
import { success, error } from "../utils/response.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { status } = req.query;

    console.log(status);

    let query = `
           SELECT
              tasks.*,
              courses.title AS course_title,
              status.name AS status
            FROM 
              tasks
            JOIN 
              courses ON tasks.course_id = courses.course_id
            JOIN 
              status ON tasks.status_id = status.status_id
        `;

    const values = [];

    if (status) {
      query += `WHERE status.name = ? AND tasks.priority = ?`;
      values.push(status);
    }

    console.log(query, status);

    const [rows] = await pool.query(query, values);

    if (rows.length === 0) {
      return error(res, "Task not found.", 204);
    }

    success(res, rows);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const [row] = await pool.query(
      `SELECT
                t.*,
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
    if (row.length === 0) {
      return error(res, "Task not found.", 204);
    }

    success(res, row[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
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
      return error(res, "Task not found.", 204);
    }

    success(res, row[0]);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
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
      return error(res, "Task not found.", 204);
    }

    success(res, { courseId: row.insertId }, 201);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const [result] = await pool.query(`DELETE FROM tasks WHERE task_id = ?`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      return error(res, "Task not found.", 204);
    }

    success(res, "Task deleted", 200);
  } catch (error) {
    next(error);
  }
});

export default router;
