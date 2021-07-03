// Punto de entrada de la aplicacion
require('dotenv').config();

const express = require('express');
const { bdConnection } = require('./database/config');
const cors = require('cors');

//Servidor
const app = express();

//configuar cors
app.use(cors());

//Conexion a base de datos
bdConnection();

//Rutas
app.get('/', (req, res) => {
    body = {
        ok: true,
        msg: "Hola mundo"
    }
    res.json(body);
});


app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en el purto " + process.env.PORT);
});

console.log("Hola mundo");