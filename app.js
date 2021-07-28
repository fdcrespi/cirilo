"use strict"

const express = require("express");
const app = express();
/*Importo los modelos creados */
const User = require("./models/user").User;
/* manejador de sesiones */
const session = require("express-session");
/* incorporar la ruta /app */
const router_app = require("./routes/app");
const router_index = require("./routes/index");
const router_category = require("./routes/category");
/* usar el middleware de session */
const session_middleware = require("./middlewares/session");
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

/* Rutas */
app.use("/", router_index);
app.use("/app", session_middleware);
app.use("/app", router_app);
app.use("/category", session_middleware);
app.use("/category", router_category);

app.listen(8080);