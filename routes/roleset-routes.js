const express = require("express");

const roleSetController = require("../controllers/roleset-controller");

const router = express.Router();

router.get("/", roleSetController.getRoleSets);
router.get("/:sid", roleSetController.getRoleSetById);

router.post("/", roleSetController.createRoleSet);

module.exports = router;