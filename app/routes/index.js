const express = require("express");
const _ = express.Router();
const apiRoutes = require("./api");
const api = process.env.BASE_URL;

_.use(api, apiRoutes);
_.use(api, (req, res) => res.json({ error: "No Api Found On This Route" }));

module.exports = _;
