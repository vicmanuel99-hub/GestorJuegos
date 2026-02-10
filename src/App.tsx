import { useState } from 'react'
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 */

/* function App() {
  return (
    <div className="min-vh-100 bg-dark text-light">
      <div className="container py-4">
        <h1>Mi app</h1>
        <button className="btn btn-success">Aceptar</button>
      </div>
    </div>
  );
} */

  function App() {
  const [videojuegos, setVideojuegos] = useState([
    { id: 1, nombre: "Fortnite", precio: 10, tamano: 20 },
    { id: 2, nombre: "Call of Duty", precio: 20, tamano: 20},
    { id: 3, nombre: "Minecraft", precio: 40, tamano: 20 },
  ]);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [tamano, setTamano] = useState("");
  const [error, setError] = useState("");

  const agregarJuego = () => {
    // Validaciones (mentalidad QA)
    if (nombre.trim() === "" || precio === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (Number(precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }

    const nuevoJuego = {
      id: videojuegos.length + 1,
      nombre,
      precio: Number(precio),
      tamano: Number(tamano),
    };

    setVideojuegos([...videojuegos, nuevoJuego]);
    setNombre("");
    setPrecio("");
    setTamano("");
    setError("");
  };

  const eliminarJuego = (id: number) => {
    const filtrados = videojuegos.filter((j) => j.id !== id);
    setVideojuegos(filtrados);
  };

  return (
    <div className="estilo1 text-light " > 
      <h1>🎮 Gestor de Videojuegos</h1>

      <h2>Agregar videojuego</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <br />
      <br />
      
      <input
        type="text"
        placeholder="tamaño"
        value={tamano}
        onChange={(e) => setTamano(e.target.value)}
      />

      <br />

      <br />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)} //e.target.value === "Mario"
      />

      <br />
      <br />

      <button  className="btn btn-dark" onClick={agregarJuego} >Agregar</button>

      <hr />

      <h2>Lista de videojuegos</h2>

      {videojuegos.length === 0 ? (
        <p>No hay videojuegos registrados</p>
      ) : (
        <ul>
          {videojuegos.map((juego) => (
            <li key={juego.id}>
              {juego.nombre} - ${juego.precio} - {juego.tamano}gb
             
             
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => eliminarJuego(juego.id)}
              >
                Eliminar
              </button>
            </li>


          ))}
        </ul>
      )}
    </div>
  );
}


export default App
