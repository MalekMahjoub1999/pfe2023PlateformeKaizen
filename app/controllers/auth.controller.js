
// les contrôleurs sont principalement responsables de la gestion des requêtes HTTP 
// et de l'interaction avec les clients
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const { check, validationResult } = require('express-validator/check');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");//khedmet el user edit

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {//erreur dans serveur 500
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
exports.deleteAll = (req, res) => {
  User.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} users were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all users."
    });
  });
};
exports.all_users = (req, res, next) => {//work
  User.find({}).exec().then(result => {
    res.status(200).json({result});
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
};
exports.deleteUser = (req, res) => {//work
  const id = req.params.id;

User.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete user with id=${id}. Maybe user  was not found!`
      });
    } else {
      res.send({
        message: "user was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete user with id=" + id
    });
  });
 };
 
//github...
// exports.update = (req, res, next) => {
//   User.findByIdAndUpdate({username: req.body.username, email: req.body.email}).exec().then(result => {
//     res.status(200).json({message: 'User updated'});
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json({error: err});
//   });
// };///all update does not work ??voir ulterieurement 
//////do //////////it//////////////know//////////////
// exports.update = (req, res) => {
//   if (!req.body) {
//       return res.status(400).send({
//         message: "Data to update can not be empty!"
//       });
//     }
//     const id = req.params.id;
//     User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//       .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `Cannot update Users with id=${id}. Maybe user was not found!`
//           });
//         } else res.send({ message: "user was updated successfully." });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating user with id=" + id
//         });
//       });
// };