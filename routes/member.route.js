const express = require("express");
const router = express.Router();
const UserController = require("../controllers/member.controller");
const jwt = require("jsonwebtoken");
const SECRET = "suiio";

router.route("/delete").post(UserController.check, UserController.check_permission, UserController.check_permission_organization, UserController.delMember);
router.route("/add").post(UserController.check, UserController.check_permission, UserController.addMember);
router.route("/fetch/all").get(UserController.listMember);
router.route("/login").post((req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    jwt.verify(token, SECRET, (jwterr, decoded) => {
        jwterr
            ? next()
            : res.status(200).json({ "result": "islogin" });
    });
}, UserController.login);
// router.route("/logout").post(UserController.logout);
router.route("/check").get(UserController.check, (req, res, next) => {
    res.status(200).json({ "result": req.userData.decoded })
});
router.route("/update/member").post(UserController.check, UserController.patchUser);
router.route("/update/password").post(UserController.check, UserController.patchPassword);

module.exports = router;
