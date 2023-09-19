/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./habits.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// full route  = /habits
router
  .route("/")
  .get(controller.list)
  //post to create a history record when habit + or - is pressed
  .post(controller.createNewHistory)
  .all(methodNotAllowed);

// full route = /habits/new
router
  .route("/new")
  //Create new habit
  .post(controller.createNewHabit)
  .all(methodNotAllowed);

// full route = /habits/habit_id
router
  .route("/:habit_id")
  .get(controller.read)
  //button to delete pressed, send full json with isActive marked false
  .put(controller.update)
  .all(methodNotAllowed);

// full route = /habits/habit_id/edit
router
  .route("/:habit_id/edit")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
