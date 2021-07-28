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
    .post(async(req, res) => {
        let category = new Category({
            name: req.body.categoria
        });
        try {
            await category.save();
            res.redirect('/category');
        } catch (err) {
            console.log(err);
        }
        /* category.save().then(() => {
            res.redirect('/category');
        }), (err) => {
            if (err) {
                console.log(String(err));
                res.send("Error al guardar la cateoria");
            }
        } */
    });

router.route("/:id")
    .get((req, res) => {
        Category.find({}, (err, categories) => {
            if (err) {
                res.redirect('/');
                return;
            }
            res.render("category/home", { categories: categories, idCategory: req.params.id });
        });
    })
    .put((req, res) => {
        const id = req.params.id;
        Category.findOneAndUpdate(id, { name: req.body.categoryEdit }, err => {
            if (err) return res.send(500, err);
            res.redirect("/category");
        });

        /*  Category.findById(req.params.id, (err, category) => {
             category.name = req.body.categoryEdit;
            category.save((err) => {
                 if (!err) {
                     res.redirect('/category');
                 } else {
                     console.log(err);
                     res.redirect('/category' + req.params.id);
                 }
             });
         res.redirect("/category"); 
    }); */
    })
    .delete((req, res) => {
        Category.findByIdAndDelete(req.params.id, (err) => {
            if (!err) {
                res.redirect('/category');
            } else {
                console.log(err);
                res.redirect('/category' + req.params.id);
            }
        })

        /*     let idDelete = req.body.id;
            category.findByIdAndRemove(idDelete, err => {
                if (err)
                    return res.send(500, err)
                res.redirect('/category');
            }) */
    });
module.exports = router;