const express = require('express');
const cors = require('cors');

require ('dotenv').config();

const { dbConnection } = require ('./database/config')
const app = express();

//VvipNyWRERYZQF2u
//gabrielgjha1

//cors
app.use(cors());



//base de datos
dbConnection();

//Lectura y parseo del body 
app.use(express.json());

//rutas
app.use('/api/usuario', require('./routes/usuarios') );
app.use('/api/login', require('./routes/login') );


//verificar puerto
app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en el puertos '+ 3000)
})