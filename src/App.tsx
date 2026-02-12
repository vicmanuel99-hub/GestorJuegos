import "./styles.css";
import { useState } from "react";
import Card from "./Card";

interface Videojuego {
  id: number;
  nombre: string;
  precio: number;
  tamano: number;
}

function App() {
  const [videojuegos, setVideojuegos] = useState<Videojuego[]>([
    { id: 1, nombre: "Fortnite", precio: 10, tamano: 20 },
    { id: 2, nombre: "Call of Duty", precio: 100, tamano: 200 },
    { id: 3, nombre: "Minecraft", precio: 4000, tamano: 2000 },
  ]);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [tamano, setTamano] = useState("");
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const guardarJuego = () => {
    if (nombre.trim() === "" || precio === "" || tamano === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (Number(precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }

    if (editandoId !== null) {
      // MODO EDITAR
      const actualizados = videojuegos.map((juego) =>
        juego.id === editandoId
          ? {
              ...juego,
              nombre,
              precio: Number(precio),
              tamano: Number(tamano),
            }
          : juego
      );

      setVideojuegos(actualizados);
      setEditandoId(null);
    } else {
      // MODO AGREGAR
      const nuevoJuego: Videojuego = {
        id: videojuegos.length + 1,
        nombre,
        precio: Number(precio),
        tamano: Number(tamano),
      };

      setVideojuegos([...videojuegos, nuevoJuego]);
    }

    limpiarFormulario();
  };

  const eliminarJuego = (id: number) => {
    const filtrados = videojuegos.filter((j) => j.id !== id);
    setVideojuegos(filtrados);
  };

  const editarJuego = (id: number) => {
    const juego = videojuegos.find((j) => j.id === id);
    if (!juego) return;

    setNombre(juego.nombre);
    setPrecio(String(juego.precio));
    setTamano(String(juego.tamano));
    setEditandoId(id);
  };

  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setTamano("");
    setError("");
  };

  return (
    <div className="ps-5 py-5">
      <Card>
        <h1>🎮 Gestor de Videojuegos</h1>

        <h2>{editandoId ? "Editar videojuego" : "Agregar videojuego"}</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          className="shadow rounded-2"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <br /><br />

        <input
          className="shadow rounded-2"
          type="number"
          placeholder="Tamaño (GB)"
          value={tamano}
          onChange={(e) => setTamano(e.target.value)}
        />

        <br /><br />

        <input
          className="shadow rounded-2"
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <br /><br />

        <button className="btn btn-dark" onClick={guardarJuego}>
          {editandoId ? "Actualizar" : "Agregar"}
        </button>
      </Card>

      <hr />

      <h2>Lista de videojuegos</h2>

      {videojuegos.length === 0 ? (
        <p>No hay videojuegos registrados</p>
      ) : (
        <table className="table cssw-800px">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tamaño</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {videojuegos.map((juego) => (
              <tr key={juego.id}>
                <td>{juego.nombre}</td>
                <td>{juego.tamano} gb</td>
                <td>${juego.precio}</td>
                <td>
                  <button
                    className="btn btn-dark"
                    onClick={() => eliminarJuego(juego.id)}
                  >
                    Eliminar
                  </button>

                  <button
                    className="ms-2 btn btn-dark"
                    onClick={() => editarJuego(juego.id)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;