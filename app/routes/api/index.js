const express = require("express");
const _ = express.Router();
const backendRoutes = require("./backend");
const frontendRoutes = require("./frontend");

_.use("/backend", backendRoutes);
_.use("/frontend", frontendRoutes);

module.exports = _;
