const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

//POST
router.route('/add/:tables').post(commentController.add);
router.route('/update/:tables').post(commentController.update);

//GET
router.route('/fetch/:tables/:tableID').get(commentController.fetchByID);
router.route('/fetch/all').get(commentController.fetchAll);

module.exports = router;