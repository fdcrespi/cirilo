"use strict"

const express = require('express');
const router = express.Router();
const Category = require("../models/category").Category;

router.route("/")
    .get((req, res) => {
        Category.find({}, (err, categories) => {
            if (err) {
                res.redirect('/');
                return;
            }
            res.render("category/home", { categories: categories });
        });
    })
    .post((req, res) => {
        let category = new Category({
            name: req.body.categoria
        });
        category.save().then(() => {
            res.redirect('/category');
        }), (err) => {
            if (err) {
                console.log(String(err));
                res.send("Error al guardar la cateoria");
            }
        }
    })

module.exports = router;