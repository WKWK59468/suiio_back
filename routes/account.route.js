const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/account.controller");
const UserController = require("../controllers/member.controller");

//POST
router.route("/add").post(UserController.check, AccountController.add);
router.route("/delete").post(UserController.check, AccountController.delete);
router.route("/update").post(UserController.check, AccountController.update);
router.route("/update/status").post(UserController.check, AccountController.updateStatus);
//GET
router.route("/fetch/diagram/year").get(AccountController.diagram_year);
router.route("/fetch/diagram/category/:year").get(AccountController.diagram_category);
router.route("/fetch/diagram/compare/:year").get(AccountController.diagram_compare);
router.route("/fetch/diagram/:year/:month").get(AccountController.diagram);
router.route("/fetch/all").get(AccountController.fetchAll);
router.route("/fetch/status/:status").get(AccountController.fetchByStatus);
router.route("/fetch/name/:name").get(AccountController.fetchByName);
router.route("/fetch/bywhom/:whom").get(AccountController.fetchByWhom);
router.route("/fetch/date/:date").get(AccountController.fetchByDate);
router.route("/fetch/id/:ID").get(AccountController.fetchByID);
module.exports = router;
