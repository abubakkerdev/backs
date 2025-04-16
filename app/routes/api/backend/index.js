const express = require("express");
const _ = express.Router();
const authenticationRoutes = require("./authentication");
const customerRoutes = require("./customer");

_.use("/authentication", authenticationRoutes);
_.use("/customer", customerRoutes);


module.exports = _; 
