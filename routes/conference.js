const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conference');

router.route('/upload').post(conferenceController.upload);
router.route('/list').get(conferenceController.list);
router.route('/fetch/category/:id').get(conferenceController.fetchCategory);
router.route('/fetch/content/:id').get(conferenceController.fetchContent);
router.route('/update/status/:id').post(conferenceController.updateStatus);
router.route('/update/content/:id').post(conferenceController.updateContent);

module.exports = router;