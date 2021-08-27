const express = require('express');
const router = express.Router();
const Statement = require("../controllers/statement.controller");

router.route('/add/byMonth').post(Statement.addByMonth);
router.route('/add/byCategory').post(Statement.addByCategory);
router.route('/add/').post(Statement.add);

router.route('/delete').post(Statement.delete);
router.route('/update').post(Statement.update);
router.route('/update/status').post(Statement.updateStatus);

router.route('/fetch/all').get(Statement.fetchAll);
router.route('/fetch/name/:name').get(Statement.fetchByName);
router.route('/fetch/status/:status').get(Statement.fetchByStatus);
router.route('/fetch/bywhom/:whom').get(Statement.fetchByWhom);
router.route('/fetch/id/:ID').get(Statement.fetchByID);
router.route('/fetch/date/:date').get(Statement.fetchByDate);
router.route('/fetch/content/:ID').get(Statement.fetchContent);

module.exports = router;