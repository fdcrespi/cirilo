"use strict";

const express = require("express");
const router = express.Router();
const User = require("../models/user").User;

router.get('/', function(req, res) {
    //console.log(req.session.user_id);
    res.render("index");
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/signup', function(req, res) {
    User.find(function(err, doc) {
        console.log(doc);
        res.render("signup");
    });
});

router.post('/users', function(req, res) {
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

router.post('/sessions', function(req, res) {
    //nos devuelve un arreglo de argumentos que nos devuelve la condicion
    //nos devuelve un alemento q cumple la condicion
    User.findOne({ email: req.body.email, password: req.body.password }, function(err, user) {
        req.session.user_id = user._id;
        res.redirect("/app");
    });
});


module.exports = router;