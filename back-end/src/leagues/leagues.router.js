/**
 * Defines the router for team resources.
 *
 * @type {Router}
 */

 const router = require("express").Router();
 const controller = require("./leagues.controller");
 const methodNotAllowed = require("../errors/methodNotAllowed");
  
 // full route  = /leagues
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