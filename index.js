// Punto de entrada de la aplicacion
require('dotenv').config();
const express = require('express');
const { bdConnection } = require('./database/config');
const cors = require('cors');

//Servidor
const app = express();

//configuar cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a base de datos
bdConnection();

//Rutas
app.use('/api/users', require('./routes/user.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/hospitales', require('./routes/hospital.route'));
app.use('/api/Medicos', require('./routes/doctors.route'));
app.use('/api/todo', require('./routes/busqueda'));


app.get('/', (req, res) => {
    body = {
        ok: true,
        msg: "Hola mundo"
    }
    res.json(body);
});



app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto " + process.env.PORT);
});

console.log("Hola mundo");