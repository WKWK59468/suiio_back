const officers = require("../controllers/officer.controller.js");
const router = require("express").Router();

// add
router.route("/add").post(officers.add);
// delete
router.route("/delete").post(officers.delete);
// fetch
router.route("/fetch/all").get(officers.fetchAll);
router.route("/fetch/position/:position").get(officers.fetchByPosition);
router.route("/fetch/authority/:authority").get(officers.fetchByAuthority);
// update
router.route("/update/officer").post(officers.updateOfficer);
router.route("/update/authorities").post(officers.updateAuthorities);
module.exports = router;