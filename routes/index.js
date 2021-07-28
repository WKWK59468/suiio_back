const express = require('express');
const router = express.Router();

const member = require('./member');
const account = require('./account');
const category = require('./category');
const officer = require('./officer.route');

router.use('/member', member);
router.use('/account', account);
router.use('/category', category);
router.use('/officers', officer);

module.exports = router;