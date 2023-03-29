const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  phone: String,
  password: String,
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

const registerUserData = async (user) => {
  try {
    const result = await userModel.create(user);
    return {
      data: result,
      status: true,
      message: "Registration Successfull...",
    };
  } catch (error) {
    return {
      error,
      status: false,
      message: "Registration Failed, something went wrong...",
    };
  }
};

const activateAccount = async (value) => {
  try {
    const result = await userModel.findOneAndUpdate(
      { confirmationCode: value },
      { status: "Active" }
    );
    return { data: result, status: true, message: "Account Confirmed" };
  } catch (error) {
    return { error, status: false };
  }
};

const getData = async (email) => {
  try {
    const result = await userModel.findOne({ email });
    return result;
  } catch (error) {
    return error;
  }
};
const findOneAndUpdate = async (id, password) => {
  console.log("password update", id);

  try {
    const result = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { password },
      },
      { projection: { _id: 1, email: 1 } }
    );
    return { result, status: 200 };
  } catch (error) {
    return { error, status: 400 };
  }
};

module.exports = {
  registerUserData,
  activateAccount,
  getData,
  findOneAndUpdate,
};
