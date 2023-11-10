const router = require("express").Router();
const controller = require("./uclData.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

console.log("Reached /fetchUCLData route");

router.get("/", controller.getUclData);

module.exports = router;