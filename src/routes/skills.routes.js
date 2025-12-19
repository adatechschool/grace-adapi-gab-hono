import express from "express";
import pool from "../db.js";

const router = express.Router();

/* GET all */
router.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM skills");
  res.json(rows);
});

/* GET one */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM skills WHERE id = $1",
    [id]
  );
  res.json(rows[0]);
});

//POST
router.post("/", async (req, res) => {
  const { name } = req.body;
  await pool.query(
    "INSERT INTO skills (name) VALUES ($1)",
    [name]
  );
    res.send("The skill name has been integrated");
});

//DELETE
router.delete("/", async (req, res) => {
  const { id } = req.body;
  await pool.query(
    "DELETE FROM skills WHERE id = $1",
    [id]
  );
  res.send("The id has been deleted");
});

//PUT
router.put("/", async (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  await pool.query(
    "UPDATE skills SET name = $2 WHERE id = $1",
    [id, name]
  );
  res.send("The skill has been updated");
});


export default router;