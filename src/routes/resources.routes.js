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

//POST
router.post("/", async (req, res) => {
  const { title } = req.body;
  await pool.query(
    "INSERT INTO resources (title) VALUES ($1)",
    [title]
  );
    res.send("The resource title has been integrated");
});

//DELETE
router.delete("/", async (req, res) => {
  const { id } = req.body;
  await pool.query(
    "DELETE FROM resources WHERE id = $1",
    [id]
  );
  res.send("The resource has been deleted");
});

//PUT
router.put("/", async (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  await pool.query(
    "UPDATE resources SET title = $2 WHERE id = $1",
    [id, title]
  );
  res.send("The resource has been updated");
});


export default router;