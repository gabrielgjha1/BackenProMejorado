const express = require('express');

const app = express.Router();
const {consulta,googleSingIn,renewToken } = require('../controller/login');
const { validarJWT } = require('../middlewares/validar-jwt');
app.post('/',consulta);
app.post('/google',googleSingIn);
app.get('/renew',validarJWT,renewToken );

module.exports=app;