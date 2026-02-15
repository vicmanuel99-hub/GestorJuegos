import "./styles.css";
import { useState, useEffect } from "react";
import Card from "./Card";

interface Videojuego {
  id: number;
  nombre: string;
  precio: number;
  tamano: number;
}

const API_URL = "http://localhost:3000/videojuegos";

function App() {
  const [videojuegos, setVideojuegos] = useState<Videojuego[]>([]);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [tamano, setTamano] = useState("");
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [cargando, setCargando] = useState(false);

  // Cargar videojuegos al montar el componente
  useEffect(() => {
    cargarVideojuegos();
  }, []);

  const cargarVideojuegos = async () => {
    try {
      setCargando(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setVideojuegos(data);
    } catch (error) {
      console.error("Error al cargar videojuegos:", error);
      setError("Error al cargar los videojuegos del servidor");
    } finally {
      setCargando(false);
    }
  };

  const guardarJuego = async () => {
    if (nombre.trim() === "" || precio === "" || tamano === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (Number(precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }

    try {
      setCargando(true);

      if (editandoId !== null) {
        // MODO EDITAR - PUT
        const response = await fetch(`${API_URL}/${editandoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            precio: Number(precio),
            tamano: Number(tamano),
          }),
        });

        if (!response.ok) {
          throw new Error("Error al actualizar el juego");
        }

        const juegoActualizado = await response.json();

        const actualizados = videojuegos.map((juego) =>
          juego.id === editandoId ? juegoActualizado : juego
        );

        setVideojuegos(actualizados);
        setEditandoId(null);
      } else {
        // MODO AGREGAR - POST
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            precio: Number(precio),
            tamano: Number(tamano),
          }),
        });

        if (!response.ok) {
          throw new Error("Error al crear el juego");
        }

        const nuevoJuego = await response.json();
        setVideojuegos([...videojuegos, nuevoJuego]);
      }

      limpiarFormulario();
    } catch (error) {
      console.error("Error al guardar:", error);
      setError("Error al guardar el videojuego");
    } finally {
      setCargando(false);
    }
  };

  const eliminarJuego = async (id: number) => {
    try {
      setCargando(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el juego");
      }

      const filtrados = videojuegos.filter((j) => j.id !== id);
      setVideojuegos(filtrados);
    } catch (error) {
      console.error("Error al eliminar:", error);
      setError("Error al eliminar el videojuego");
    } finally {
      setCargando(false);
    }
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

        {cargando && <p style={{ color: "blue" }}>⏳ Cargando...</p>}
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