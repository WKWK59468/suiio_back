const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.route('/add').post(categoryController.addCategory);
router.route('/patch').post(categoryController.patchCategory);

module.exports = router;