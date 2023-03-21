const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://localhost:27017/auth")
  .then((connection) => {
    console.log("Database connected..");
  })
  .catch((error) => {
    console.log("ERROR: ", error);
  });
