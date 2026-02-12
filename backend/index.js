const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let videojuegos = [
  { id: 1, nombre: "Fortnite", precio: 10, tamano: 20 },
  { id: 2, nombre: "Call of Duty", precio: 100, tamano: 200 },
];

let nextId = 3;

////////////////////////////////////////////////////////
// GET → Obtener todos los videojuegos
////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando🚀");
});

app.get("/videojuegos", (req, res) => {
  res.json(videojuegos);
});



////////////////////////////////////////////////////////
// POST → Crear videojuego
////////////////////////////////////////////////////////
app.post("/videojuegos", (req, res) => {
  const { nombre, precio, tamano } = req.body;

  if (!nombre || !precio || !tamano) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  const nuevoJuego = {
    id: nextId++,
    nombre,
    precio,
    tamano,
  };

  videojuegos.push(nuevoJuego);

  res.status(201).json(nuevoJuego);
});

////////////////////////////////////////////////////////
// PUT → Actualizar videojuego
////////////////////////////////////////////////////////
app.put("/videojuegos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio, tamano } = req.body;

  const juego = videojuegos.find((j) => j.id === id);

  if (!juego) {
    return res.status(404).json({ mensaje: "Juego no encontrado" });
  }

  juego.nombre = nombre;
  juego.precio = precio;
  juego.tamano = tamano;

  res.json(juego);
});

////////////////////////////////////////////////////////
// DELETE → Eliminar videojuego
////////////////////////////////////////////////////////
app.delete("/videojuegos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const existe = videojuegos.some((j) => j.id === id);

  if (!existe) {
    return res.status(404).json({ mensaje: "Juego no encontrado" });
  }

  videojuegos = videojuegos.filter((j) => j.id !== id);

  res.json({ mensaje: "Eliminado correctamente" });
});

////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});