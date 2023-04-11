const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
// const UserController = require('../controllers/user.controller');
const express = require('express');
//  const { User, validate } = require("../models/user.model");

// const mongoose = require('mongoose');
const router = express.Router();//teb3in edit user eleate w update 
// const {check, validationResult} = require('express-validator/check');
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  // router.post("/", async (req, res) => {
  //     try {
  //         const { error } = validate(req.body);
  //         if (error) return res.status(400).send(error.details[0].message);
  
  //         const user = await new User(req.body).save();
  
  //         res.send(user);
  //     } catch (error) {
  //         res.send("An error occured");
  //         console.log(error);
  //     }
  // });//resetpsw why resetpsw w inscri dnt work toogether ?

  }
  
  
  
  
  // module.exports = router;