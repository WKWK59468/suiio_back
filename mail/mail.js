const nodemailer = require('nodemailer');
const myFunction = require('../myFunction');
require('dotenv').config();

const mailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 's1110634025@gms.nutc.edu.tw',
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: process.env.accessToken,
        expires: 1484314697598
    },
});



const mail = (sID, pwd) => {
    const time = new Date();
    const year = time.getFullYear()
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    const date = year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
    const mailOptions = {
        from: 's1110634025@gms.nutc.edu.tw',
        to: 'wkwk59468@gmail.com',
        subject: '【資管科科學會帳本資訊管理平台】- 帳號申請完成',
        html: `<h2>同學您好</h2><p>您的帳號於 ${date} 註冊成功，請登入平台修改您的密碼。</p><br>帳號：${sID}<br>密碼：${pwd}<br><br>網站：http://127.0.0.1:4000/login.html`
    }

    mailTransport.on('token', token => {
        console.log('A new access token was generated');
        console.log('User: %s', token.user);
        console.log('Access Token: %s', token.accessToken);
        console.log('Expires: %s', new Date(token.expires));
    });

    mailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMail: (req, pwd) => {
        const sID = req.body.sID;
        return new Promise((resolve, reject) => {
            myFunction.check_session(req).then(() => {
                mail(sID, pwd);
                resolve(true);
            }).catch(() => {
                reject(false);
            });
        })
    }
}