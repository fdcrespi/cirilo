"use strict";

const express = require('express');
/* Es un objeto router definido por express para definir rutas */
const router = express.Router();

/* /app/ */

router.get('/', function(req, res) {
    res.render("app/home");
});

/* Exportamos todo el objeto para importarlo en otros js */
module.exports = router;