"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/db_fotos", { useNewUrlParser: true, useUnifiedTopology: true });

/* Las validaciones en mongoose se hace a nivel de schema */

const posibles_valores = ["M", "F"];
const email_match = [/.+\@.+\..+/, "Coloca un email válido"]

/* Funcion que valida las contraseñas iguales */
const password_validation = {
    validator: function(pass) {
        return this.password_confirmation == pass;
    },
    message: "Las constraseñas no coinciden"
}

const user_schema = new Schema({
    name: String,
    last_name: String,
    username: { type: String, required: true, maxlength: [50, "El nombre de usuario es muy largo"] },
    password: {
        type: String,
        required: true,
        minlength: [8, "El password tiene que tener mas de 8 caracteres"],
        validate: password_validation
    },
    age: { type: Number, min: [1, "La edad no puede ser menos que 1"], max: [100, "La edad no puede ser mayor que 100"] },
    email: { type: String, required: "El correo es obligatorio", match: email_match },
    date_of_birth: Date,
    sex: { type: String, enum: { values: posibles_valores, message: "Opcion no valida" } }
});

user_schema.virtual("password_confirmation").get(function() {
    return this.pass_confirm;
}).set(function(password) {
    this.pass_confirm = password;
});

const user = mongoose.model('User', user_schema);

module.exports.User = user;