const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
    host: config.Host,
    port: config.Port,
    secure: false,
    auth: {
        user: config.Username,
        pass: config.Password,
    },
});

module.exports = async function (mailDes, url) {
    const info = await transporter.sendMail({
        from: 'Website8Bit <tranduyanh2174@gmai.com>',
        to: mailDes,
        subject: "Xác nhận đổi mật khẩu", // Subject line
        html: "<p>bấm vào click here để đổi mật khẩu<a href=" + url + ">  click here</a></p>", // html body
    });
}