const express = require("express");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/:uid", userController.getUser);
router.post("/new", userController.createUser);
router.post("/login", userController.login);

module.exports = router;