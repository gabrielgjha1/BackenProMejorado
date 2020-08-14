const express = require('express');
const cors = require('cors');

require ('dotenv').config();

const { dbConnection } = require ('./database/config')
const app = express();

//VvipNyWRERYZQF2u
//gabrielgjha1

//base de datos
dbConnection();

//cors
app.use(cors())

//rutas


//verificar puerto
app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en el puertos '+ 3000)
})