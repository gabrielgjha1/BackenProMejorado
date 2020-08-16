const express = require('express');

const app = express.Router();
const {consulta} = require('../controller/login');

app.post('/',consulta);


module.exports=app;