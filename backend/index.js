const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

////////////////////////////////////////////////////////
// CONFIGURACIÓN DE SQLITE
////////////////////////////////////////////////////////

// Crear/abrir la base de datos (se crea el archivo database.db)
const db = new Database("database.db");

// Crear la tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS videojuegos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    tamano INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insertar datos iniciales si la tabla está vacía
const count = db.prepare("SELECT COUNT(*) as count FROM videojuegos").get();
if (count.count === 0) {
  const insert = db.prepare(
    "INSERT INTO videojuegos (nombre, precio, tamano) VALUES (?, ?, ?)"
  );
  insert.run("Fortnite", 10, 20);
  insert.run("Call of Duty", 100, 200);
  console.log("✅ Datos iniciales insertados");
}

console.log("✅ Base de datos SQLite conectada");

////////////////////////////////////////////////////////
// GET → Obtener todos los videojuegos
////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando🚀 con SQLite");
});

app.get("/videojuegos", (req, res) => {
  try {
    const videojuegos = db.prepare("SELECT * FROM videojuegos ORDER BY id ASC").all();
    res.json(videojuegos);
  } catch (error) {
    console.error("Error al obtener videojuegos:", error);
    res.status(500).json({ mensaje: "Error al obtener videojuegos" });
  }
});

////////////////////////////////////////////////////////
// POST → Crear videojuego
////////////////////////////////////////////////////////
app.post("/videojuegos", (req, res) => {
  const { nombre, precio, tamano } = req.body;

  if (!nombre || !precio || !tamano) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  try {
    const insert = db.prepare(
      "INSERT INTO videojuegos (nombre, precio, tamano) VALUES (?, ?, ?)"
    );
    const result = insert.run(nombre, precio, tamano);

    const nuevoJuego = db.prepare("SELECT * FROM videojuegos WHERE id = ?").get(result.lastInsertRowid);

    res.status(201).json(nuevoJuego);
  } catch (error) {
    console.error("Error al crear videojuego:", error);
    res.status(500).json({ mensaje: "Error al crear videojuego" });
  }
});

////////////////////////////////////////////////////////
// PUT → Actualizar videojuego
////////////////////////////////////////////////////////
app.put("/videojuegos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio, tamano } = req.body;

  try {
    const update = db.prepare(
      "UPDATE videojuegos SET nombre = ?, precio = ?, tamano = ? WHERE id = ?"
    );
    const result = update.run(nombre, precio, tamano, id);

    if (result.changes === 0) {
      return res.status(404).json({ mensaje: "Juego no encontrado" });
    }

    const juegoActualizado = db.prepare("SELECT * FROM videojuegos WHERE id = ?").get(id);
    res.json(juegoActualizado);
  } catch (error) {
    console.error("Error al actualizar videojuego:", error);
    res.status(500).json({ mensaje: "Error al actualizar videojuego" });
  }
});

////////////////////////////////////////////////////////
// DELETE → Eliminar videojuego
////////////////////////////////////////////////////////
app.delete("/videojuegos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deleteStmt = db.prepare("DELETE FROM videojuegos WHERE id = ?");
    const result = deleteStmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ mensaje: "Juego no encontrado" });
    }

    res.json({ mensaje: "Eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar videojuego:", error);
    res.status(500).json({ mensaje: "Error al eliminar videojuego" });
  }
});

////////////////////////////////////////////////////////
// CERRAR BASE DE DATOS AL TERMINAR
////////////////////////////////////////////////////////

process.on("SIGINT", () => {
  db.close();
  console.log("\n✅ Base de datos cerrada correctamente");
  process.exit(0);
});

////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 Base de datos: database.db`);
});