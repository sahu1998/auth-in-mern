const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { registerUserData, activateAccount, getData } = require("../model");

const user = process.env.USER;
const pass = process.env.PASSWORD;

// const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

const sendConfirmationEmail = async (name, email, confirmationCode) => {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      // ######### to send a single user ############
      // to: email,

      // ######### to send multiple user ############
      // to: ["sajalsahu.ms@gmail.com", "dhangar2526@gmail.com"],

      // ######## OR we can pass like this #############
      to: [
        { name: "Mahi", address: "dhangar2526@gmail.com" },
        { name: "Sajal Sahu", address: "sajalsahu.ms@gmail.com" },
      ],

      subject: "Confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thanks for signing up with Shaka laka boom boom! You must follow this link within 5 minutes of registration to activate your account:</p>
        <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log("Email Sending Error: ", err));
};

const postSignupController = async (req, res) => {
  console.log("signup data: ", req.body);

  const user = await getData(req.body.email);

  if (user) {
    return res.send({ status: false, message: "Email already exist." });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
    expiresIn: 180,
  });
  const response = await registerUserData({
    ...req.body,
    password: hash,
    confirmationCode: token,
  });
  const registerdUser = response.data;

  // ############ sending mail for email verification
  if (response.status) {
    sendConfirmationEmail(
      registerdUser.username,
      registerdUser.email,
      registerdUser.confirmationCode
    );
  }

  //   res.send(response);
  res.status(200).send(response);
};

const verifyUserEmail = async (req, res) => {
  console.log("ehekljsdfdsklf");
  const response = await activateAccount(req.params.confirmationCode);
  res.send(response);
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log("login user: ", req.body);
  if (!(email && password)) {
    res.send({ message: "email and password required", login: false });
    return;
  }
  const result = await getData(email);

  console.log("RESULT: ", result);
  if (!(result && bcrypt.compareSync(password, result.password))) {
    return res.send({ message: "credential not matched", login: false });
  }

  if (result.status === "Pending") {
    console.log("pending...");
    return res.send({
      message: "Account Pending, An Email Sent for Account Confirmation.",
      login: false,
    });
  }

  const token = jwt.sign(
    { id: result._id, email: result.email },
    process.env.SECRET_KEY
  );
  console.log("token: ", token);
  res.send({
    email: result.email,
    username: result.username,
    name: result.first_name + " " + result.last_name,
    token,
    login: true,
    message: `You are logged in as ${
      result.first_name + " " + result.last_name
    }.`,
  });
};

module.exports = { postSignupController, verifyUserEmail, loginController };

//   const dcrypt = bcrypt.compareSync(req.body.password, hash);
//   console.log(dcrypt);
