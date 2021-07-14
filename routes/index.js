const express = require('express');
const router = express.Router();

const user = require('./users');
const account = require('./account');
const category = require('./category');
const officer = require('./officer.route');

router.use('/user', user);
router.use('/account', account);
router.use('/category', category);
// officers
router.use('/officers', officer);

module.exports = router;