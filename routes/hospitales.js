const express = require('express');
const {ConsultarHospitales,GuardarHospitales,EliminarHospitales,ActualizarHospitales} = require('../controller/hospitales');
const app = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');

app.get('/',ConsultarHospitales);
app.post('/',validarJWT,GuardarHospitales);
app.delete('/:id',validarJWT,EliminarHospitales);
app.put('/:id',validarJWT,ActualizarHospitales);
module.exports = app;
