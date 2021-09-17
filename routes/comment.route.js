const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.route('/add').post(commentController.add);

module.exports = router;