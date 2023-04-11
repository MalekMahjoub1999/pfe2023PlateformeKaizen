const mongoose = require("mongoose");

// const Schema = mongoose.Schema;
// const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {type:String,
    required:true,},
    email: {type:String,
    required:true,},
    password: {type:String,
    required:true,},
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);
// const validate = (user) => {
//   const schema = Joi.object({
//       name: Joi.string().required(),
//       email: Joi.string().email().required(),
//       password: Joi.string().required(),
//   });
//   return schema.validate(user);
// };

module.exports =  User;

