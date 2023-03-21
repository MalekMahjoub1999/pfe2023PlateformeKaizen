const db = require("../models");
const Profile = db.profiles;
// Create and Save a new profile
exports.create = (req, res) => {
 // Validate request
 if (!req.body.nom) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Profile
  const profile = new Profile({
    
    nom:req.body.nom,
    prenom: req.body.prenom,
    date_naissance:req.body.date_naissance,
    téléphone: req.body.téléphone,
    adresse: req.body.adresse,
    Email: req.body.Email,
    diplôme: req.body.diplôme,
    domaine_Etude: req.body.domaine_Etude,
    école:req.body.école,
    certificat:req.body.certificat,
    formation:req.body.formation,
    Compétence:req.body.Compétence,
    published: req.body.published ? req.body.published : false
  });

  // Save Profile in the database
  profile
    .save(profile)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profile."
      }); 
    });
};

// Retrieve all profiles from the database.
exports.findAll = (req, res) => {
    const nom = req.query.nom;
    var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};
  
    Profile.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving profiles."
        });
      });
};

// Find a single Profile with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Profile.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Profile with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Profile with id=" + id });
    });
};

// Update a profile by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Profile with id=${id}. Maybe Profile was not found!`
            });
          } else res.send({ message: "Profile was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Profile with id=" + id
          });
        });
};

// Delete a profile with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Profile.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`
          });
        } else {
          res.send({
            message: "Profile was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Profile with id=" + id
        });
      });
};

// Delete all profile from the database.
exports.deleteAll = (req, res) => {
  Profile.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Profile were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all profiles."
    });
  });
};

// Find all published profile
exports.findAllPublished = (req, res) => {
  Profile.find({ published: true })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving profiles."
    });
  });
};