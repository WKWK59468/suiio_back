const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const UserController = require("../controllers/member.controller");

router.route("/add").post(UserController.check, categoryController.addCategory);
router.route("/delete").post(UserController.check, categoryController.delCategory);
router.route("/update/status").post(UserController.check, categoryController.patchStatus);

router.route("/fetch/all").get(categoryController.listCategory);
router.route("/fetch/status/:status").get(categoryController.fetchStatusOn);

module.exports = router;
