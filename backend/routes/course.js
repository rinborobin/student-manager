import express from "express";
import pool from "../db.js";
import { error, success } from "../utils/response.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM courses;`);
    if (rows.length === 0) {
      error(res, "Course not found.", 204);
    }

    success(res, rows);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const [row] = await pool.query(
      `SELECT * FROM courses WHERE course_id = ?`,
      [id],
    );

    if (row.length === 0) {
      return error(res, "Course not found.", 204);
    }

    success(res, row[0]);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId, title, code, description } = req.body;

    const [result] = await pool.query(
      `INSERT INTO courses (user_id, title, code, description)
       VALUES (?, ?, ?, ?)`,
      [userId, title, code, description],
    );

    success(
      res,
      {
        courseId: result.insertId,
        message: "Course created successfully.",
      },
      201,
    );
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, code, description } = req.body;

    const [result] = await pool.query(
      `UPDATE courses
       SET title = ?, code = ?, description = ?
       WHERE course_id = ?`,
      [title, code, description, id],
    );

    if (result.affectedRows === 0) {
      return error(res, "Course not found.", 404);
    }

    success(res, {
      message: "Course updated successfully.",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const [result] = await pool.query(
      `DELETE FROM courses WHERE course_id = ?`,
      [id],
    );

    if (result.affectedRows === 0) {
      return error(res, "Course not found.", 404);
    }

    success(res, {
      message: "Course deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
