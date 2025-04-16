const express = require("express");
const {
  handleCategory: category,
  handleStoreCategory: storeCategory,
  handleEditCategory: editCategory,
  handleUpdateCategory: updateCategory,
  handleDestroyCategory: destroyCategory,
} = require("../../../controllers/frontend/categoryController");
const _ = express.Router();
 

_.get("/", category);
_.post("/store", storeCategory);
_.get("/edit", editCategory);
_.post("/update", updateCategory);
_.get("/destroy", destroyCategory);

module.exports = _;
