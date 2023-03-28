const express = require("express");
const {
  postSignupController,
  loginController,
  checkEmailController,
  verifyUserEmail,
} = require("../controller");
const { verifyUserToken } = require("../middleware");

const route = express.Router();

route.post("/register", postSignupController);
route.post("/login", loginController);
route.post("/check-email", checkEmailController);
route.post("/change-password", checkEmailController);

route.get("/verify-user/:token", verifyUserToken, (req, res) => {
  res.send(req.authorized);
});
route.get("/api/user/confirm/:confirmationCode", verifyUserEmail);

module.exports = { route };
