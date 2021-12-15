const officers = require("../controllers/officer.controller.js");
const router = require("express").Router();
const UserController = require("../controllers/member.controller");

// add
router
  .route("/add")
  .post(
    UserController.check,
    UserController.check_permission,
    UserController.check_permission_organization,
    officers.add
  );
// delete
router
  .route("/delete")
  .post(
    UserController.check,
    UserController.check_permission,
    UserController.check_permission_organization,
    officers.delete
  );
// fetch
router.route("/fetch/all").get(officers.fetchAll);
router.route("/fetch/position/:position").get(officers.fetchByPosition);
router.route("/fetch/permission/:permission").get(officers.fetchByPermission);
// update
router
  .route("/update/officer")
  .post(
    UserController.check,
    UserController.check_permission,
    UserController.check_permission_organization,
    officers.updateOfficer
  );
router
  .route("/update/permission")
  .post(
    UserController.check,
    UserController.check_permission,
    UserController.check_permission_organization,
    officers.updatePermission
  );
module.exports = router;
