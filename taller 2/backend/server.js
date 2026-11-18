const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,      // "db" = nombre del servicio
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get("/api/health", (req, res) => res.json({ status: "ok", capa: "backend" }));

app.get("/api/db", async (req, res) => {
  try {
    const r = await pool.query("SELECT NOW() AS hora");
    res.json({ status: "ok", capa: "database", hora: r.rows[0].hora });
  } catch (e) {
    res.status(500).json({ status: "error", detalle: e.message });
  }
});

app.get("/api/mensajes", async (req, res) => {
  const r = await pool.query("SELECT * FROM mensajes ORDER BY id DESC");
  res.json(r.rows);
});

app.post("/api/mensajes", async (req, res) => {
  const r = await pool.query(
    "INSERT INTO mensajes (texto) VALUES ($1) RETURNING *", [req.body.texto]
  );
  res.status(201).json(r.rows[0]);
});

app.listen(3000, () => console.log("API escuchando en puerto 3000"));