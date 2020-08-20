const express = require('express');
const cors = require('cors');

require ('dotenv').config();

const { dbConnection } = require ('./database/config')
const app = express();

//VvipNyWRERYZQF2u
//gabrielgjha1

//cors
app.use(cors());


//Lectura y parseo del body 
app.use(express.json());

//base de datos
dbConnection();

//Directorio publico 
app.use(express.static('public'));


//rutas
app.use('/api/usuario', require('./routes/usuarios') );
app.use('/api/login', require('./routes/login') );
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/Medicos'));
app.use('/api/buscar',require('./routes/buscarTodo'));
app.use('/api/subir',require('./routes/subir'));
//verificar puerto
app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en el puertos '+ 3000)
})