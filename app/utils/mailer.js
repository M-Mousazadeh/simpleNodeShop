const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transport = smtpTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, //ssl
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendMail = (email, fullname, subject, message) => {
  const transporter = nodeMailer.createTransport(transport);

  const sendOption = {
    from: process.env.EMAIL,
    to: email,
    subject,
    html: `<h1>hello ${fullname}</h1><p>${message}</p>`,
  };

  transporter.sendMail(sendOption);
};
