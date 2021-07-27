"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/cirilo", { useNewUrlParser: true, useUnifiedTopology: true });

const category_schema = new Schema({
    name: { type: String, required: true, unique: true }
});

const category = mongoose.model("Category", category_schema);

module.exports.Category = category;