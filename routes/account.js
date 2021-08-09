const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/account');

//POST
router.route('/add').post(AccountController.add);
router.route('/delete').post(AccountController.delete);
router.route('/update').post(AccountController.update);
//GET
router.route('/fetch/all').get(AccountController.fetchAll);
router.route('/fetch/status/:status').get(AccountController.fetchStatus);

module.exports = router;