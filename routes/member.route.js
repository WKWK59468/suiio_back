const express = require('express');
const router = express.Router();
const UserController = require('../controllers/member.controller');

router.route('/delete').post(UserController.delMember);
router.route('/add').post(UserController.addMember);
router.route('/fetch/all').get(UserController.listMember);
router.route('/login').post(UserController.login);
router.route('/logout').post(UserController.logout);
router.route('/check').get(UserController.check);
router.route('/update/member').post(UserController.patchUser);
router.route('/update/password').post(UserController.patchPassword);

module.exports = router;