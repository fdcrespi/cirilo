"use strict";
const express = require("express");
const router = express.Router();

/* incorporar la ruta /app */
const router_app = require("./app");
const router_index = require("./index");
const router_category = require("./category");

/* usar el middleware de session */
const session_middleware = require("../middlewares/session");

/* Rutas */
router.use("/", router_index);
router.use("/app", session_middleware);
router.use("/app", router_app);
router.use("/category", session_middleware);
router.use("/category", router_category);

module.exports = router;