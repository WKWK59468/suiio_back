const express = require("express");
const router = express.Router();
const conferenceController = require("../controllers/conference.controller");
const UserController = require("../controllers/member.controller");
const Category = require("../controllers/category.controller");

router
  .route("/add")
  .post(
    UserController.check,
    UserController.check_permission,
    UserController.check_permission_conference,
    Category.check,
    conferenceController.upload
  );
router.route("/fetch/all").get(conferenceController.list);
router.route("/fetch/category/:id").get(conferenceController.fetchCategory);
router.route("/fetch/status/:status").get(conferenceController.fetchByStatus);
router.route("/fetch/content/:id").get(conferenceController.fetchContent);
router
  .route("/update/status")
  .post(
    UserController.check,
    UserController.check_permission,
    UserController.check_permission_conference,
    conferenceController.updateStatus
  );
router
  .route("/update/content")
  .post(
    UserController.check,
    UserController.check_permission,
    UserController.check_permission_conference,
    conferenceController.updateContent
  );

module.exports = router;
