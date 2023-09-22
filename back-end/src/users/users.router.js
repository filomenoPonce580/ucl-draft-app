/**
 * Defines the router for user resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./users.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// full route  = /users
router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

// full route = /users/new
router
  .route("/new")
  //Create new user
  .post(controller.create)
  .all(methodNotAllowed);

// full route = /users/userId
router
  .route("/:userId")
  .get(controller.read)
  .put(controller.updateUser)
  .all(methodNotAllowed);

// full route = /users/userId/edit
// router
//   .route("/:userId/edit")
//   .get(controller.read)
//   .put(controller.update)
//   .all(methodNotAllowed);

module.exports = router;
