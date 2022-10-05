// const nodeMailer = require('nodemailer');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  const messsage = {
    to: options.email,
    from: process.env.SENDGRID_MAIL,
    subject: options.subject,
    text: options.message,

  };
  console.log(messsage);
  sgMail
    .send(messsage)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
