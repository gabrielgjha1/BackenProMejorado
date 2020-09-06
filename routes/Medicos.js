const express = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const app = express.Router();
const {ConsultarMedicos,GuardarMedicos,borrarMedicos,ActualizarMedico,traerMedico  } = require('../controller/medicos');

app.get('/',ConsultarMedicos);
app.get('/:id',traerMedico );
app.post('/',validarJWT,GuardarMedicos);
app.delete('/:id',validarJWT,borrarMedicos);
app.put('/:id',validarJWT,ActualizarMedico);

module.exports = app;