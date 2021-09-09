const express = require('express');
const router = express.Router();

const member = require('./member');
const account = require('./account');
const category = require('./category');
const officer = require('./officer.route');
const conference = require('./conference');
const statement = require('./statement.route');
const fileupload = require('./fileupload.route');
const mail = require('./mail');

router.use('/member', member);
router.use('/account', account);
router.use('/category', category);
router.use('/officers', officer);
router.use('/conference', conference);
router.use('/statement', statement);
router.use('/mail', mail);
router.use('/file', fileupload);

module.exports = router;