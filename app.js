"use strict"

const express = require("express");
const app = express();
/*Importo los modelos creados */
const User = require("./models/user").User;
/* manejador de sesiones */
const session = require("express-session");
/* incorporar la ruta /app */
const router_app = require("./router_app");
/* usar el middleware de session */
const session_middleware = require("./middlewares/session");

app.use(express.static(__dirname + '/public'));
//app.use("/estatico", express.static('public'));
/* para leer parametros de un form */
app.use(express.json()); // para peticiones en application/json
app.use(express.urlencoded({ extended: true })); //para peticiones normales con extended le decimos el algoritmo, con true hacemos parsing con mas cosas 

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

app.get('/', function(req, res) {
    console.log(req.session.user_id);
    res.render("index");
});

app.get('/signup', function(req, res) {
    User.find(function(err, doc) {
        console.log(doc);
        res.render("signup");
    });
});

app.get('/login', function(req, res) {
    res.render('login');
})

app.post('/users', function(req, res) {
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    });
    //el metodo save, sirve para guardar. Es asyncrono
    //la primera se ejecuta si todo salio bien, la segunda si hubo errores
    user.save().then((us) => {
        res.send("Guardamos el usuario exitosamente");
    }), (err) => {
        if (err) {
            console.log(String(err));
            res.send("No pudimos guardar la información, verifique la misma");
        };
    }
});

app.post('/sessions', function(req, res) {
    //nos devuelve un arreglo de argumentos que nos devuelve la condicion
    //nos devuelve un alemento q cumple la condicion
    User.findOne({ email: req.body.email, password: req.body.password }, function(err, user) {
        req.session.user_id = user._id;
        res.redirect("/app");
    });
});

app.use("/app", session_middleware);
app.use("/app", router_app);



app.listen(8080);