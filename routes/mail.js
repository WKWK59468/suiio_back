const express = require('express');
const router = express.Router();
const mail = require('../mail/mail');

router.route('/').get(mail.sendMail);
module.exports = router;