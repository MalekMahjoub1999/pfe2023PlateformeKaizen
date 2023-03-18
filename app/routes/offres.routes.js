module.exports = app => {
    const offres = require("../controllers/offres.controller.js");
  
    var router = require("express").Router();
  
    // Create a new offres
    router.post("/", offres.create);
  
    // Retrieve all offres
    router.get("/", offres.findAll);
  
    // Retrieve all published offres
    router.get("/published", offres.findAllPublished);
  
    // Retrieve a single offres with id
    router.get("/:id", offres.findOne);
  
    // Update a offres with id
    router.put("/:id", offres.update);
  
    // Delete a offres with id
    router.delete("/:id", offres.delete);
  
    // Delete all offres
    router.delete("/", offres.deleteAll);
  
    app.use('/api/offres', router);
  };