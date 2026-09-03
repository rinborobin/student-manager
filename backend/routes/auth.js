import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";
import { success, error } from "../utils/response.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const [rows] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) AS emailExists`,
      [email],
    );

    if (rows[0].emailExists === 1) {
      return error(res, { message: "Email already in use." }, 422);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      `INSERT INTO users(name, email, password_hash) VALUES(?, ?, ?)`,
      [name, email, hashedPassword],
    );
    success(
      res,
      {
        userId: result.insertId,
        message: "User registered successfully.",
      },
      201,
    );
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) AS emailExists`,
      [email],
    );

    console.log(rows);

    if (rows[0].emailExists === 0) {
      return error(res, { message: "Email or username doesn't exist." }, 401);
    }

    const [row] = await pool.query(
      `SELECT password_hash FROM users WHERE email = ?`,
      [email],
    );

    const comparePassword = await bcrypt.compare(
      password,
      row[0].password_hash,
    );

    if (comparePassword === true) {
      return success(res, {
        message: "Login successful.",
      });
    }
    return error(res, { message: "Email or password is incorrect." }, 401);
  } catch (error) {
    next(error);
  }
});

export default router;
