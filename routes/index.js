const express = require('express');
const router = express.Router();

const user = require('./users');
const account = require('./account');
const category = require('./category');
const officer = require('./officer.route');
const conference = require('./conference');

router.use('/user', user);
router.use('/account', account);
router.use('/category', category);
router.use('/officers', officer);
router.use('/conference', conference);

module.exports = router;