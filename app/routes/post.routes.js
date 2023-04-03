module.exports = app => {
    const poste = require("../controllers/post.controller.js");
  
    var router = require("express").Router();
  
    // Create a new post
    router.post("/", poste.create);
  
    // Retrieve all offres
    router.get("/", poste.findAll);
  
   
  
    app.use('/api/poste', router);
  };