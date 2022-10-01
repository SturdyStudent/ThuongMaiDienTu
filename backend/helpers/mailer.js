const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport")

let transporter = nodemailer.createTransport(smtpTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL_SMTP_USERNAME,
        pass: process.env.EMAIL_SMTP_PASSWORD
    },
}));

exports.send = (from, to, subject, html) => {
    return transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: html
    });
}