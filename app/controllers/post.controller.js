const db = require("../models");
const Poste = db.poste;

// envoyer un offre 
    exports.create = (req, res) => {
        // Validate request
        if (!req.body.nom) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
        }
        // postuler
        const poste = new Poste({
          nom: req.body.nom,
          email:req.body.email,
        //   idOffres:req.body.idOffres,
         telecharger_votre_cv:req.body.telecharger_votre_cv,
          posted: req.body.posted ? req.body.posted : false
        });
     
        // Save postes in the database
        poste
          .save(poste)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the postes."
            });
          });
      };


// Retrieve all the postleted offers from the database.
exports.findAll = (req, res) => {
    const nom = req.query.nom;
  var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};

  Poste.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving offres."
      });
    });
};

