/**
 * Defines the router for team resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./teams.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
 
// full route  = /teams
router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

   
module.exports = router;