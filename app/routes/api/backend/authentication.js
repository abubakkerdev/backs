const express = require("express");
const {
  handleAuth: allAuth,
  handleStoreUser: storeUser,
  handleEmailVerify: emailVerify,
  handleTokenVerify: tokenVerify,
  handleForgotPassword: forgotPassword,
  handleChangePassword: changePassword,
  handleEditUser: editUser,
  handleUpdateUser: updateUser,
  handleDestroyUser: destroyUser,
  handleLoginUser: loginUser,
} = require("../../../controllers/backend/authenticationController");
const authRegisterValidation = require("../../../middleware/backend/authRegisterValidation");
const registerValidation = require("../../../middleware/backend/registerValidation");
const authLoginValidation = require("../../../middleware/backend/authLoginValidation");
const apiGetRequestValidation = require("../../../middleware/backend/apiGetRequestValidation");
const apiPostRequestValidation = require("../../../middleware/backend/apiPostRequestValidation");
const passwordValidation = require("../../../middleware/backend/passwordValidation");
const _ = express.Router();

_.get("/", apiGetRequestValidation, allAuth);

_.post("/store", authRegisterValidation, registerValidation, storeUser);
_.get("/confirm-email/:token", emailVerify);
_.post("/login", authLoginValidation, loginUser);

_.post("/forgot-password", apiPostRequestValidation, forgotPassword);
_.get("/forgot-password/:token", tokenVerify);

_.post(
  "/change-password",
  apiPostRequestValidation,
  passwordValidation,
  changePassword
);

_.get("/edit", editUser);
_.post("/update", apiPostRequestValidation, updateUser);
_.get("/destroy", destroyUser);

module.exports = _;
