"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/cirilo", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const category_schema = new Schema({
    name: { type: String, required: true }
});

const category = mongoose.model("Category", category_schema);

module.exports.Category = category;