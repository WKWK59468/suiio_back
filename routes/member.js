const express = require('express');
const router = express.Router();
const UserController = require('../controllers/member');

router.route('/del').post(UserController.delMember);
router.route('/add').post(UserController.addMember);
router.route('/list').get(UserController.listMember);

router.route('/login').post(UserController.getLogin);
router.route('/get').post(UserController.getUser);
router.route('/patch').post(UserController.patchUser);
router.route('/patchPassword').post(UserController.patchPassword);

module.exports = router;