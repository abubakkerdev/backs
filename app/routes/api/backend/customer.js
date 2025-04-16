const express = require("express");
const {
  handleAllCustomer: allCustomer,
  handleStoreCustomer: storeCustomer,
  handleEditCustomer: editCustomer,
  handleUpdateCustomer: updateCustomer,
  handleDestroyCustomer: destroyCustomer,
} = require("../../../controllers/backend/customerController");
const getUserIsLoginValidation = require("../../../middleware/backend/getUserIsLoginValidation");
const postUserIsLoginValidation = require("../../../middleware/backend/postUserIsLoginValidation");
const customerFromValidation = require("../../../middleware/backend/customerFromValidation");

const _ = express.Router();
 
_.get("/all", getUserIsLoginValidation, allCustomer);
_.post(
  "/store",
  postUserIsLoginValidation,
  customerFromValidation,
  storeCustomer
);
_.get("/edit/:id", getUserIsLoginValidation, editCustomer);
_.post(
  "/update",
  postUserIsLoginValidation,
  customerFromValidation,
  updateCustomer
);
_.post("/destroy", postUserIsLoginValidation, destroyCustomer);

module.exports = _;
