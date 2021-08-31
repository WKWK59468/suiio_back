const nodemailer = require('nodemailer');
require('dotenv').config()

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

const mailOptions = {
    from: 's1110634025@gms.nutc.edu.tw',
    to: 'wkwk59468@gmail.com',
    subject: '請接收訊息',
    text: 'test',
}

class sendMail {
    sendMail = (req, res) => {

        mailTransport.on('token', token => {
            console.log('A new access token was generated');
            console.log('User: %s', token.user);
            console.log('Access Token: %s', token.accessToken);
            console.log('Expires: %s', new Date(token.expires));
        });

        mailTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                res.send('Email sent: ' + info.response);
            }
        });
    }

}

module.exports = new sendMail();