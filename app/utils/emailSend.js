const nodemailer = require("nodemailer");
const mailUsername = process.env.MAIL_USERNAME;
const mailPassword = process.env.MAIL_PASSWORD;

const emailSend = async (email, ...agr) => {
  let template = agr[0];
  let emailFrom = agr[1];
  let emailSubject = agr[2];
  let data = agr[3];

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailUsername,
      pass: mailPassword,
    },
  });

  let info = await transporter.sendMail({
    from: emailFrom,
    to: email,
    subject: emailSubject,
    html: template(data),
  });
};

module.exports = emailSend;
