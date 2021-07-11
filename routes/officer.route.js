const officers = require("../controllers/officer.controller.js");
const router = require("express").Router();

// add officer
router.route("/add").post(officers.add);
// delete officer
router.route("/delete").post(officers.delete);
// list officer
router.route("/fetchAll").post(officers.fetchAll);
// update officer
router.route("/update").post(officers.update);
module.exports = router;