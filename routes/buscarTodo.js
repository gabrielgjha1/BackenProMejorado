const express = require('express');
const {buscarTodo,buscarColeccion} = require('../controller/buscarTodo');
const { validarJWT } = require('../middlewares/validar-jwt');
const app = express.Router();

app.get('/:busqueda',buscarTodo);
app.get('/coleccion/:tabla/:busqueda',validarJWT,buscarColeccion);

module.exports = app