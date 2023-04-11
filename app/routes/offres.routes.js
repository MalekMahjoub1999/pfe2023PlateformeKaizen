module.exports = app => {
    const offres = require("../controllers/offres.controller.js");
  
    var router = require("express").Router();
  
    // Create a new offres
    router.post("/", offres.create);//work
  
    // Retrieve all offres
    router.get("/", offres.findAll);//work
  
    // Retrieve all published offres
    router.get("/published", offres.findAllPublished);//work
  
    // Retrieve a single offres with id
    router.get("/:id", offres.findOne);//work
    // router.get("/:title", offres.findOne);

    // Update a offres with id
    router.put("/:id", offres.update);//work
  
    // Delete a offres with id
    router.delete("/:id", offres.delete);//work
  
    // Delete all offres
    router.delete("/", offres.deleteAll);
  
    app.use('/api/offres', router);
  };