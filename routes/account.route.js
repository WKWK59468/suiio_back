const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/account.controller');

//POST
router.route('/add').post(AccountController.add);
router.route('/delete').post(AccountController.delete);
router.route('/update').post(AccountController.update);
router.route('/update/status').post(AccountController.updateStatus);
//GET
router.route('/fetch/diagram/:year/:month').get(AccountController.diagram);
router.route('/fetch/all').get(AccountController.fetchAll);
router.route('/fetch/status/:status').get(AccountController.fetchByStatus);
router.route('/fetch/name/:name').get(AccountController.fetchByName);
router.route('/fetch/bywhom/:whom').get(AccountController.fetchByWhom);
router.route('/fetch/date/:date').get(AccountController.fetchByDate);
router.route('/fetch/id/:ID').get(AccountController.fetchByID);
module.exports = router;