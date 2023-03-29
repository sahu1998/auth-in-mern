const nodemailer = require("nodemailer");

const user = process.env.USER;
const pass = process.env.PASSWORD;
const base_url = process.env.BASE_URL;

module.exports = async (email, subject, text) => {
  console.log("Check");
  try {
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });
    const mailResult = await transport.sendMail({
      from: user,
      to: email,
      subject: subject,
      text: base_url + text,
    });
    console.log("email send successfully");
    return { mailResult, status: 200, message: "Email Send Successfully" };
  } catch (error) {
    return { error, status: 400, message: "Email sending error." };
  }
};
