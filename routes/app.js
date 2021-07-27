"use strict";

const express = require('express');
/* Es un objeto router definido por express para definir rutas */
const router = express.Router();
/*Importo los modelos creados */
const User = require("../models/user").User;

/* /app/ */

router.get('/', function(req, res) {
    res.render("app/home");
});

/* Exportamos todo el objeto para importarlo en otros js */
module.exports = router;