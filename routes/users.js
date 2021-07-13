const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.route('/del').post(UserController.delUser);
router.route('/add').post(UserController.addUser);
router.route('/list').get(UserController.listUser);
router.route('/test').post(UserController.testUser);

router.route('/login').post(UserController.getLogin);
router.route('/get').post(UserController.getUser);
router.route('/patch').post(UserController.patchUser);
router.route('/patchPassword').post(UserController.patchPassword);

module.exports = router;