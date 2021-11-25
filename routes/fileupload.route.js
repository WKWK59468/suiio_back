const express = require("express");
const router = express.Router();
const UserController = require("../controllers/member.controller");

const imageUploadController = require("../controllers/imageUpload.controller");
const docUploadController = require("../controllers/documentUpload.controller");

router.route("/upload/image").post(UserController.check, imageUploadController.uploadFile);
router.route("/list/image").get(imageUploadController.getFilesList);
router.route("/download/image/:name").get(imageUploadController.downloadFiles);

router.route("/upload/document").post(UserController.check, docUploadController.uploadFile);
router.route("/list/document").get(docUploadController.getFilesList);
router.route("/download/document/:name").get(docUploadController.downloadFiles);

module.exports = router;
