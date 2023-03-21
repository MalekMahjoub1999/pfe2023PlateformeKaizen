module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nom: String,
        prenom: String,
        date_naissance:String,
        téléphone: String,
        adresse: String,
        Email: String,
        diplôme: String,
        domaine_Etude: String,
        école:String,
        certificat:String,
        formation:String,
        Compétence:String,
        published: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Profile = mongoose.model("profile", schema);
    return Profile;
  };