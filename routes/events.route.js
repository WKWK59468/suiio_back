const express = require('express');
const router = express.Router();
const eventController = require('../controllers/events.controller');

// router.route('/add').post(eventController.add);

// router.route('/fetch/sID').get(eventController.fetchOfficer);
router.route('/fetch/comment/:sID').get(eventController.fetchComment);

module.exports = router;