const nodeoutlook = require("nodejs-nodemailer-outlook")

exports.send = (from, to, subject, html) => {
    nodeoutlook.sendEmail({
        auth: {
            user: "powellbook@outlook.com",
            pass: "AcerNitro5"
        },
        from: from,
        to: to,
        subject: subject,
        html: html,
        onSuccess: () => console.log("Đã gửi email xác nhận")
    });
}