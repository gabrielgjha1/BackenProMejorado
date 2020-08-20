const express = require('express');

const app = express.Router();
const {consulta,googleSingIn} = require('../controller/login');

app.post('/',consulta);
app.post('/google',googleSingIn);


module.exports=app;