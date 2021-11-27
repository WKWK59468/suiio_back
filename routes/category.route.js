const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const UserController = require("../controllers/member.controller");

router.route("/add").post(UserController.check, UserController.check_permission, categoryController.addCategory);
router.route("/delete").post(UserController.check, UserController.check_permission, UserController.check_permission_finance, categoryController.delCategory);
router.route("/update/status").post(UserController.check, UserController.check_permission, UserController.check_permission_finance, categoryController.patchStatus);

router.route("/fetch/all").get(categoryController.listCategory);
router.route("/fetch/status/:status").get(categoryController.fetchStatusOn);

module.exports = router;
