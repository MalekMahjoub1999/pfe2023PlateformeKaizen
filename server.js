const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const expressValidator = require('express-validator');
const dbConfig = require("./app/config/db.config");
// const passwordReset = require("./app/routes/passwordReset");//resetpsw import

const app = express();//we gona save express instance dans varaible app
global.__basedir = __dirname;
app.use(expressValidator());
// const fs = require('fs')
// const path = require('path')
// const dotenv = require('dotenv')
// dotenv.config()
var corsOptions = {
  origin: ["http://localhost:8000"],
  credentials: true
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
////tamel table okhra tsemeha usergoogle///// 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "plateformKAI-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const db1 = require("./app/models");
const offresModel = require("./app/models/offres.model");
const Role = db1.role;

db1.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to plateform application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/offres.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/index.routes")(app);
// require("./app/routes/passwordReset");//resetpsw
// require("./app/routes/passwordReset")(app);
// app.use("/api/users", users);
// app.use("/api/password-reset", passwordReset);//apiresertpsw




// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// app.get("/search/:key",async(req,res)=>{
// let data= await Offres.find()
//   res.send("data ")//trajaek data fil postman en frme json
// })
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
