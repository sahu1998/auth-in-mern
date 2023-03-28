const express = require("express");
const { postSignupController, loginController } = require("../controller");
const { verifyUserToken } = require("../middleware");

const route = express.Router();

route.post("/register", postSignupController);
route.post("/login", loginController);
route.get("/verify-user/:token", verifyUserToken, (req, res) => {
  res.send(req.authorized);
});
module.exports = { route };
