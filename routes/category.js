const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.route('/add').post(categoryController.addCategory);
router.route('/del').post(categoryController.delCategory);
router.route('/list').get(categoryController.listCategory);
router.route('/setStatus').post(categoryController.patchStatus);

module.exports = router;