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

const sendConfirmationEmail = async (recepient) => {
  console.log("Check");
  try {
    const mailResult = await transport.sendMail({
      from: user,
      // ######### to send a single user ############
      to: recepient.email,

      // ######### to send multiple user ############
      // to: ["sajalsahu.ms@gmail.com", "dhangar2526@gmail.com"],

      // ######## OR we can pass like this #############
      // to: [
      //   { name: "Mahi", address: "dhangar2526@gmail.com" },
      //   { name: "Sajal Sahu", address: "sajalsahu.ms@gmail.com" },
      // ],

      subject: recepient.subject,
      html: `<h1>${recepient.heading}</h1>
        <h2>${recepient.subHeading}</h2>
        <p>${recepient.message}</p>
        <a href=http://localhost:3000${recepient.route}> Click here</a>
        </div>`,
    });
    return { mailResult, status: 200, message: "Email Send Successfully" };
  } catch (error) {
    return { error, status: 400, message: "Email sending error." };
  }
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
    const mailInfo = {
      subject: `Confirm Your Account`,
      heading: `Email Confirmation`,
      subHeading: `hello ${registerdUser.username}`,
      email: registerdUser.email,
      message: `Thanks for signing up with Shaka laka boom boom! You must follow this link within 5 minutes of registration to activate your account:`,
      route: `/confirm/${registerdUser.confirmationCode}`,
    };
    const mailResult = await sendConfirmationEmail(mailInfo);
    if (mailResult.status === 200) {
      res.send({
        data: registerdUser,
        status: true,
        message:
          "Registration Successfull, Please verify email before login...",
      });
    } else {
      res.send(mailResult);
    }
  } else {
    res.send(response);
  }
};

const verifyUserEmail = async (req, res) => {
  console.log("ehekljsdfdsklf");
  const response = await activateAccount(req.params.confirmationCode);
  res.send(response);
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
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

const checkEmailController = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.send({ message: "Please Enter Email!", status: 400 });
  }
  try {
    var result = await getData(email);
    if (!result) {
      // return res.send({ message: "Email does not exist!", status: 400 });
      throw { message: "Email does not exist!", status: 400 };
    }
  } catch (error) {
    return res.send(error);
  }
  console.log(result);

  try {
    const { _id, email, username } = result;
    const confirmationCode = jwt.sign({ _id, email }, process.env.SECRET_KEY, {
      expiresIn: 300,
    });
    const mailInfo = {
      subject: `Forgot Password`,
      heading: `Change Your Password`,
      subHeading: `hello ${username}`,
      email,
      message: `Here is your password reset link, You must follow this link within 5 minutes to change password.`,
      route: `/reset-password/${confirmationCode}`,
    };
    const mailResult = await sendConfirmationEmail(mailInfo);
    return res.send(mailResult);
  } catch (error) {
    return res.send(error);
  }
};
module.exports = {
  postSignupController,
  verifyUserEmail,
  loginController,
  checkEmailController,
};

//   const dcrypt = bcrypt.compareSync(req.body.password, hash);
//   console.log(dcrypt);
