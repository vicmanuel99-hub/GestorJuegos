const express = require('express'); //llama a express para crear el servidor
const app = express(); //ejecutamos express para crear el servidor
const port = 3127; //por el puerto que va a escuchar el servidor


app.use(express.json()); //todo lo que llegue al servidor lo va a convertir a formato json

let videojuegos =[
    {id: 1, nombre: "fortnite", precio: 10},
    {id: 2, nombre: "call of duty",precio: 20},
    {id: 3, nombre: "minecraft",precio: 40}
];

app.listen(port, () => {  //arrancamos la app
    console.log(`Servidor escuchando en el puerto ${port}`);
});