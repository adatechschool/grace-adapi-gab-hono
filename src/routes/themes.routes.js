import express from "express";
import pool from "../db.js";

const router = express.Router();

//GET ALL
router.get("/", async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM themes");
    res.json(rows);
});

//GET ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM themes WHERE id = $1", [id]);
    res.json(rows); 
 });

//POST
router.post("/", async (req, res) => {
    const { name, description } = req.body;
    await pool.query(
        "INSERT INTO themes (name, description) VALUES ($1, $2)", [name, description]);
    res.json("The theme has been created along with its description");
});

//PUT
router.put("/", async (req, res) => {
  const { id } = req.body;
  const { description } = req.body;
  await pool.query(
    "UPDATE themes SET description = $2 WHERE id = $1",
    [id, description]
  );
  res.send("The theme has been updated");
});


//DELETE
router.delete("/", async (req, res) => {
    const { id } = req.body;
    await pool.query (
        "DELETE FROM themes WHERE id = ($1)", [id]);
    res.json("The theme has been deleted");
})

export default router;