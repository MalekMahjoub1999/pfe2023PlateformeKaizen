const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

const passwordReset = require("./passwordReset");

const { Router } = require("express");
const router = require("express").Router();
const {check, validationResult} = require('express-validator/check');
const bcrypt = require("bcryptjs");
const {
 
  resetPasswordRequestController,
  resetPasswordController,
} = require("../controllers/auth.controller");
const User = require("../models/user.model");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);//work

  app.post("/api/auth/signout", controller.signout);//work
 app.delete("/api/auth/deleteUser/:id", controller.deleteUser);//work

  // Update a user with id
  // app.put("api/auth/update/:id", User.update);//username/email//check another time??
 
  app.get("/api/auth/all_users", controller.all_users);//workl admin voir all users
  app.delete("/api/auth/deleteAll", controller.deleteAll);
  // app.post("/api/auth/password-reset", passwordReset);//si j ai oublier mdp

  //  // Update a offres with id
  //  router.put("/:id", offres.update);//work

};



