var express = require('express');
const { Router } = require('express');
const { check } = require('express-validator');
const {GetUsuarios,CrearUSuario,actualizarUsuario,BorrarUsuario} = require ('../controller/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
var app = Router();


app.get('/', validarJWT ,GetUsuarios);
app.post('/', 
        [
        check('nombre','nombre obligatorio').not().isEmpty(),
        check('email','Formato email').isEmail(),
        check('password','Password obligatoria').not().isEmpty(),
        ] ,
    CrearUSuario);
app.put('/:id',actualizarUsuario);
app.delete('/:id',BorrarUsuario);

module.exports=app;