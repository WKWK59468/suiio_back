const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.route('/add').post(categoryController.addCategory);
router.route('/delete').post(categoryController.delCategory);
router.route('/update/status').post(categoryController.patchStatus);

router.route('/fetch/all').get(categoryController.listCategory);
router.route('/fetch/status/:status').get(categoryController.fetchStatusOn);

module.exports = router;