const express = require("express");
const router = express.Router();
const UserController = require("../controllers/member.controller");

router.route("/delete").post(UserController.check, UserController.delMember);
router.route("/add").post(UserController.check, UserController.addMember);
router.route("/fetch/all").get(UserController.listMember);
router.route("/login").post(UserController.login);
router.route("/logout").post(UserController.logout);
router.route("/check").get(UserController.check, (req, res, next) => {
    res.status(200).json({ "result": req.userData.decoded })
});
router.route("/update/member").post(UserController.check, UserController.patchUser);
router.route("/update/password").post(UserController.check, UserController.patchPassword);

module.exports = router;
