import express from "express";
import pool from "../db.js";

const router = express.Router();

/* GET all */
router.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM resources");
  res.json(rows);
});

/* GET one */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM resources WHERE id = $1",
    [id]
  );
  res.json(rows[0]);
});

/* POST */
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  console.log(req.body);

  const { rows } = await pool.query(
    "INSERT INTO resources (title, description) VALUES ($1, $2) RETURNING *",
    [title, description]
  );
  res.status(201).json(rows[0]);
});

export default router;