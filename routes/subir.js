
const fileUpload = require('express-fileupload');
const express = require('express');
const app = express.Router();
const {SubirImagen,RetornarImagen} = require('../controller/subir');
const { validarJWT } = require('../middlewares/validar-jwt');
app.use(fileUpload());
app.put('/:tipo/:id',validarJWT,SubirImagen);
app.get('/:tipo/:foto',RetornarImagen);


module.exports = app;