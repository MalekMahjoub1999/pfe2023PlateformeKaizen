const util = require("util");
const multer = require("multer");//multer biblio tkhalik tamel telechra ll fichier te3ek b maniere facile et tjibelk el url de fichier 
const maxSize = 2 * 1024 * 1024;
//initialiser  Multer Storage engine and defines middleware

//
let storage = multer.diskStorage({//ykhalik testoriii el files te3i fil serveur te3 app
  destination: (req, file, cb) => {//callback
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);//util.promisify() tkhalik trouterni objet mech tokod taml fil callback te3ek 
module.exports = uploadFileMiddleware;