const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { route } = require("./api/routes");
require("./dbConnection");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", route);
app.listen(process.env.PORT || 8022, () => {
  console.log("Server Started%%%%%%%%%%", process.env.PORT || 8022);
});
