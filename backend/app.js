const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { verifyUserEmail } = require("./api/controller");
const { route } = require("./api/routes");
require("./dbConnection");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", route);
app.get("/api/user/confirm/:confirmationCode", verifyUserEmail);
app.listen(process.env.PORT || 8022, () => {
  console.log("Server Started%%%%%%%%%%", process.env.PORT || 8022);
});
