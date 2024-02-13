/**
 * Defines the router for results resources.
 *
 * @type {Router}
 */

 const router = require("express").Router();
 const controller = require("./results.controller");
 const methodNotAllowed = require("../errors/methodNotAllowed");
  
 // full route  = /results
 router
   .route("/")
   .get(controller.list)
   .all(methodNotAllowed);
 
 router
   .route("/addscore")
   .get(controller.read)
   .put(controller.addResult)
   .all(methodNotAllowed)
    
 module.exports = router;