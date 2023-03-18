const db = require("../models");
const Offres = db.offres;

// Create and Save a new Offres
    exports.create = (req, res) => {
        // Validate request
        if (!req.body.title) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
        }
        // Create a offres
        const offres = new Offres({
          title: req.body.title,
          description: req.body.description,
          published: req.body.published ? req.body.published : false
        });
        // Save offres in the database
        offres
          .save(offres)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the offres."
            });
          });
      };


// Retrieve all Offres from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Offres.find(condition)
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

// Find a single Offres with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Offres.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found offres with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving offres with id=" + id });
      });
};

// Update a Offres by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Offres.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update offres with id=${id}. Maybe offres was not found!`
            });
          } else res.send({ message: "offres was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating offres with id=" + id
          });
        });
};

// Delete a Offres with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

  Offres.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete offres with id=${id}. Maybe offres was not found!`
        });
      } else {
        res.send({
          message: "offres was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete offres with id=" + id
      });
    });
};

// Delete all Offres from the database.
exports.deleteAll = (req, res) => {
    Offres.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} offres were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all offres."
      });
    });
};

// Find all published Offres
exports.findAllPublished = (req, res) => {
    Offres.find({ published: true })
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