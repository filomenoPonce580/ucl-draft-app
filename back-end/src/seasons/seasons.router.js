/**
* Defines the router for seasons resources.
*
* @type {Router}
*/

const router = require("express").Router();
const controller = require("./seasons.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
  
// full route  = /seasons
router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);
 
//  router
//    .route("/addscore")
//    .get(controller.read)
//    .put(controller.addResult)
//    .all(methodNotAllowed)
    
module.exports = router;