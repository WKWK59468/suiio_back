const express = require('express');
const router = express.Router();

const fileuploadController = require('../controllers/fileupload.controller');

router.route('/upload').post(fileuploadController.uploadFile);
router.route('/list').get(fileuploadController.getFilesList);
router.route('/download/:name').get(fileuploadController.downloadFiles);

module.exports = router;