const dbConfig = require("../config/db.config.js");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];
// db.Contrat = ["CDD", "CDI", "cantrat temps partiel"];
db.url = dbConfig.url;
db.offres = require("./offres.model.js")(mongoose);
db.profiles = require("./profile.model.js")(mongoose);

module.exports = db;