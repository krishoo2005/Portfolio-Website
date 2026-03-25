import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize SQLite Database
  const db = new sqlite3.Database("portfolio.db", (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Connected to the SQLite database.");
      db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }
  });

  app.use(express.json());

  // API Routes
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
    db.run(query, [name, email, message], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, id: this.lastID });
    });
  });

  app.get("/api/contacts", (req, res) => {
    db.all("SELECT * FROM contacts ORDER BY created_at DESC", [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
