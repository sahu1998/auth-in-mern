const nodemailer = require("nodemailer");
require("dotenv").config();

const user = process.env.USER;
const pass = process.env.PASSWORD;

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

      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello,</h2>
        <p>Thank you for register. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log("Email Sending Error: ", err));
};

const sendEmailController = (req, res) => {
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

      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
      <h2>Hello,</h2>
      <p>Thank you for register. Please confirm your email by clicking on the following link</p>
      <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
      </div>`,
    })
    .catch((err) => console.log("Email Sending Error: ", err));
};
