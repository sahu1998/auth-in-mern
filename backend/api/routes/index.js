const express = require("express");
const { postSignupController, loginController } = require("../controller");

const route = express.Router();

route.post("/register", postSignupController);
route.post("/login", loginController);

module.exports = { route };
