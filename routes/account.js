const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/account');

router.route('/add').post(AccountController.addAccount); //ADD
router.route('/search').post(AccountController.searchAccount); //ONE
router.route('/get').post(AccountController.getAccount); //ALL

module.exports = router;