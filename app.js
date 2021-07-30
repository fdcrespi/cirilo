"use strict"

const express = require("express");
const app = express();
/* manejador de sesiones */
const session = require("express-session");

/** Para pasar los parametros por link */
const methodOverride = require('method-override')

app.use(express.static(__dirname + '/public'));
//app.use("/estatico", express.static('public'));
/* para leer parametros de un form */
app.use(express.json()); // para peticiones en application/json
app.use(express.urlencoded({ extended: true })); //para peticiones normales con extended le decimos el algoritmo, con true hacemos parsing con mas cosas 

app.use(methodOverride('_method'))

/** para la session */
app.use(session({
    //clave unica por app para q no haya colisiones
    secret: "ds5f4as6d8f7sa6df13",
    //la sesion se vuelve a guardar sin ser modificada, con true
    resave: false,
    //indica si la sesion se debe guardar aun no inicializada
    saveUninitialized: false
}));

app.set('view engine', 'pug');

app.use("/", require("./routes/routes"));


app.listen(8080);