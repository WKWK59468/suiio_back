const express = require("express");
const router = express.Router();
const conferenceController = require("../controllers/conference.controller");
const Category = require("../controllers/category.controller");

router.route("/add").post(Category.check, conferenceController.upload);
router.route("/fetch/all").get(conferenceController.list);
router.route("/fetch/category/:id").get(conferenceController.fetchCategory);
router.route("/fetch/status/:status").get(conferenceController.fetchByStatus);
router.route("/fetch/content/:id").get(conferenceController.fetchContent);
router.route("/update/status").post(conferenceController.updateStatus);
router.route("/update/content").post(conferenceController.updateContent);

module.exports = router;
