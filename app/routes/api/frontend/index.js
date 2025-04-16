const express = require("express");
const _ = express.Router();
const categoryRoutes = require("./category");

_.use("/category", categoryRoutes);

module.exports = _;
