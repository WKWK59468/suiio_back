const express = require('express');
const router = express.Router();
const Statement = require("../controllers/statement.controller");

router.route('/add').post(Statement.add);
router.route('/delete').post(Statement.delete);
router.route('/update').post(Statement.update);

module.exports = router;