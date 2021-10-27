const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

//POST
router.route('/add/:tables').post(commentController.add);
router.route('/update').post(commentController.update);
router.route('/delete').post(commentController.delete);

//GET
router.route('/fetch/Bymember/:sID').get(commentController.fetchByMember);
router.route('/fetch/all').get(commentController.fetchAll);
router.route('/fetch/:tables/:tableID').get(commentController.fetchByID);

module.exports = router;