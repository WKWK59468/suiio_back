const express = require('express');
const router = express.Router();

const user = require('./users');
const account = require('./account');
const category = require('./category');

router.use('/user', user);
router.use('/account', account);
router.use('/category', category);

module.exports = router;