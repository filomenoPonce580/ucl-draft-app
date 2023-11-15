const router = require("express").Router();
const controller = require("./uclData.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

console.log("Reached /fetchUCLData route");

router.route("/")
    .get(controller.fetchUCLData)
    .all(methodNotAllowed);

module.exports = router;