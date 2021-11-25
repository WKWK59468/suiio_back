const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const UserController = require("../controllers/member.controller");

//POST
router.route("/add/:tables").post(UserController.check, commentController.add);
router.route("/update").post(UserController.check, commentController.update);
router.route("/delete").post(UserController.check, commentController.delete);

//GET
router.route("/fetch/Bymember/:sID").get(commentController.fetchByMember);
router.route("/fetch/all").get(commentController.fetchAll);
router.route("/fetch/:tables/:tableID").get(commentController.fetchByID);

module.exports = router;
