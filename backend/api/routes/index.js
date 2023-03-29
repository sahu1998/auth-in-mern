const express = require("express");
const {
  postSignupController,
  loginController,
  checkEmailController,
  verifyUserEmail,
  changePasswordController,
} = require("../controller");
const { verifyUserToken } = require("../middleware");

const route = express.Router();

route.post("/register", postSignupController);
route.post("/login", loginController);
route.post("/check-email", checkEmailController);
route.post("/change-password/:id/:token", changePasswordController);

route.get("/verify-user/:id/:token", verifyUserToken, (req, res) => {
  res.send(req.authorized);
});
route.get("/api/user/confirm/:id/:confirmationCode", verifyUserEmail);

module.exports = { route };
