import "./styles.css";
import { useState } from "react";
import Card from "./Card";

function App() {
  const [videojuegos, setVideojuegos] = useState([
    { id: 1, nombre: "Fortnite", precio: 10, tamano: 20 },
    { id: 2, nombre: "Call of Duty", precio: 20, tamano: 20 },
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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <Card>
        <h1>🎮 Gestor de Videojuegos</h1>

        <h2>Agregar videojuego</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          className="shadow rounded-2"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <br />
        <br />

        <input
          className="shadow rounded-2"
          type="text"
          placeholder="tamaño"
          value={tamano}
          onChange={(e) => setTamano(e.target.value)}
        />

        <br />

        <br />

        <input
          className="shadow rounded-2"
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)} //e.target.value === "Mario"
        />

        <br />
        <br />

        <button className="btn btn-dark " onClick={agregarJuego}>
          Agregar
        </button>
        <br />
        <br />
      </Card>
      <hr />
   <h2>Lista de videojuegos</h2>   
<table className="table cssw-800px">

   <thead>
    <tr >
      <th>Nombre</th>
      <th>Precio</th>
      <th>Tamaño</th>
      <th>Accion</th>
    </tr>
  </thead>
      

      {videojuegos.length === 0 ? (
        <p>No hay videojuegos registrados</p>
      ) : (
         <tbody>
          {videojuegos.map((juego) => (
            <tr key={juego.id}>
              <td>{juego.nombre}</td>
              <td>${juego.precio}</td>
              <td> {juego.tamano}gb</td>
                

              <button
                className="btn btn-dark"
                onClick={() => eliminarJuego(juego.id)}
              >
                Eliminar
              </button>
              
            </tr>
          ))}
     </tbody>   
      )}

</table>

      
    </div>
  );
}




export default App;
