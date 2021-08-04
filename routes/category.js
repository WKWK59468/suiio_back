const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.route('/add').post(categoryController.addCategory);
router.route('/delete').post(categoryController.delCategory);
router.route('/fetch/all').get(categoryController.listCategory);
router.route('/update/status').post(categoryController.patchStatus);

module.exports = router;